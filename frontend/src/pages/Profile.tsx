import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../store/modules/authSlice";
import axios from "axios";
import {
  TossPaymentsWidgets,
  loadTossPayments,
} from "@tosspayments/tosspayments-sdk";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // Toss Payments Client Key

interface ProfileProps {
  onChangePage: (
    page: "home" | "login" | "register" | "requests" | "profile"
  ) => void;
}

interface Bid {
  id: number;
  amount: number;
  User: { id: number; nickname: string };
}

interface RequestItem {
  id: number;
  title: string;
  budget: number;
  amount: number; // ✅ 선택된 입찰 금액 추가
  status: string;
  selectedBid?: { id: number; amount: number; User: { nickname: string } };
  Bids: Bid[];
}

interface MyBid {
  id: number;
  amount: number;
  Request: {
    id: number;
    title: string;
    budget: number;
    User: { nickname: string };
  };
}

const Profile: React.FC<ProfileProps> = ({ onChangePage }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [password, setPassword] = useState("");
  const [myRequests, setMyRequests] = useState<RequestItem[]>([]);
  const [myBids, setMyBids] = useState<MyBid[]>([]); // ✅ 내 입찰 목록 추가
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<null | RequestItem>(
    null
  );

  const [widgets, setWidgets] = useState<null | TossPaymentsWidgets>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api-server/session",
          {
            withCredentials: true,
          }
        );

        if (res.data.isAuthenticated) {
          dispatch(login(res.data.user));
        } else {
          onChangePage("login");
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 실패:", error);
      }
    };

    const fetchMyRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api-server/my-requests",
          {
            withCredentials: true,
          }
        );

        if (res.data.isSuccess) {
          setMyRequests(res.data.myRequests);
        }
      } catch (error) {
        console.error("내 요청 목록 가져오기 실패:", error);
      }
    };

    const fetchMyBids = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api-server/my-bids",
          {
            withCredentials: true,
          }
        );

        if (res.data.isSuccess) {
          setMyBids(res.data.myBids);
        }
      } catch (error) {
        console.error("내 입찰 목록 가져오기 실패:", error);
      }
    };

    if (!user) {
      fetchUserProfile();
    }
    fetchMyRequests();
    fetchMyBids(); // ✅ 내 입찰 목록 불러오기
  }, [user, dispatch, onChangePage]);

  const handleSelectBid = async (requestId: number, bidId: number) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api-server/select-bid",
        { requestId, bidId },
        { withCredentials: true }
      );

      if (res.data.isSuccess) {
        alert("입찰이 선택되었습니다. 요청이 마감되었습니다.");
        setMyRequests((prev) =>
          prev.map((req) =>
            req.id === requestId
              ? { ...req, status: "closed", selectedBidId: bidId }
              : req
          )
        );
      }
    } catch (error) {
      console.error("입찰 선택 실패:", error);
      alert("입찰 선택 중 오류가 발생했습니다.");
    }
  };

  // ✅ 최초 1회만 Toss Payments 위젯 초기화
  useEffect(() => {
    async function fetchPaymentWidgets() {
      if (!user) return;
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgetsInstance = tossPayments.widgets({
          customerKey: `user_${user.id}`,
        });
        setWidgets(widgetsInstance);
      } catch (error) {
        console.error("Error initializing payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [user]);

  // ✅ 결제 UI 렌더링 (isPaymentOpen이 true일 때 실행)
  useEffect(() => {
    async function renderWidgets() {
      if (!isPaymentOpen || !selectedRequest || !widgets) return;

      try {
        console.log("📌 결제 UI 렌더링 시작");

        const amount = selectedRequest.selectedBid?.amount ?? 1;
        await widgets.setAmount({ currency: "KRW", value: amount });

        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });

        await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });

        console.log("📌 결제 UI 렌더링 완료");
      } catch (error) {
        console.error("❌ 결제 위젯 렌더링 오류:", error);
      }
    }

    renderWidgets();
  }, [isPaymentOpen, selectedRequest, widgets]);

  // ✅ 결제 요청 함수
  const handlePaymentRequest = async () => {
    if (!selectedRequest || !widgets) return;

    try {
      await widgets.requestPayment({
        orderId: `order_${selectedRequest.id}`,
        orderName: selectedRequest.title,
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: user?.email || "",
        customerName: user?.nickname || "",
      });
    } catch (error) {
      console.error("❌ 결제 오류:", error);
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  // ✅ 결제 버튼 클릭 시 실행되는 함수
  const handlePaymentClick = (request: RequestItem) => {
    if (!request.selectedBid) {
      return alert("선택된 입찰이 없습니다.");
    }
    if (!user || !user.id) {
      return alert("사용자 정보가 로드되지 않았습니다. 다시 시도해주세요.");
    }

    setSelectedRequest(request);
    setIsPaymentOpen(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/api-server/update-profile",
        { nickname, password },
        { withCredentials: true }
      );

      if (res.data.isSuccess) {
        dispatch(
          login({
            id: user?.id || 0,
            email: user?.email || "",
            nickname,
          })
        );
        alert("프로필이 업데이트되었습니다.");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto my-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">로그인이 필요합니다.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">내 프로필</h1>

      {/* ✅ 프로필 수정 폼 */}
      <div className="mb-6">
        <label className="block text-gray-700">이메일 (수정 불가)</label>
        <input
          type="email"
          value={user.email}
          className="w-full border px-3 py-2 rounded bg-gray-100"
          disabled
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">
          비밀번호 (변경하려면 입력)
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="새 비밀번호 입력"
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        변경사항 저장
      </button>

      {/* ✅ 내가 입찰한 목록 */}
      <h2 className="text-2xl font-bold mt-8">내 입찰 목록</h2>

      {myBids.length === 0 ? (
        <p className="mt-4">입찰한 요청이 없습니다.</p>
      ) : (
        myBids.map((bid) => (
          <div key={bid.id} className="border p-4 mb-4">
            <h3 className="text-lg font-bold">{bid.Request.title}</h3>
            <p>입찰 금액: {bid.amount.toLocaleString()}원</p>
            <p>요청자: {bid.Request.User.nickname}</p>
            <p>예산: {bid.Request.budget.toLocaleString()}원</p>
          </div>
        ))
      )}

      {/* ✅ 내가 등록한 요청 */}
      <h2 className="text-2xl font-bold mt-8">내 요청 목록</h2>

      {myRequests.length === 0 ? (
        <p className="mt-4">등록된 요청이 없습니다.</p>
      ) : (
        myRequests.map((request) => (
          <div key={request.id} className="border p-4 mb-4">
            <h3 className="text-lg font-bold">{request.title}</h3>
            <p>예산: {request.budget.toLocaleString()}원</p>
            <p
              className={`mt-2 text-sm font-semibold ${
                request.status === "open"
                  ? "text-green-500" // 진행 중
                  : request.status === "closed"
                  ? "text-gray-500" // 마감됨
                  : request.status === "paid"
                  ? "text-blue-500" // 결제 완료
                  : request.status === "draft"
                  ? "text-yellow-500" // 작성 중
                  : request.status === "submitted"
                  ? "text-purple-500" // 제출됨
                  : request.status === "completed"
                  ? "text-indigo-500" // 완료됨
                  : "text-gray-500"
              }`}
            >
              상태:{" "}
              {request.status === "open"
                ? "진행 중"
                : request.status === "closed"
                ? "마감됨"
                : request.status === "paid"
                ? "결제 완료"
                : request.status === "draft"
                ? "작성 중"
                : request.status === "submitted"
                ? "제출됨"
                : request.status === "completed"
                ? "완료됨"
                : "알 수 없음"}
            </p>

            {/* ✅ 마감된 요청일 경우 선택된 입찰 금액 표시 */}
            {request.status === "closed" && request.selectedBid && (
              <div>
                <p className="text-blue-500 mt-2">
                  선택된 입찰 금액:{" "}
                  {request.selectedBid.amount.toLocaleString()}원 (
                  {request.selectedBid.User.nickname})
                </p>
                <button
                  onClick={() => handlePaymentClick(request)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  결제하기
                </button>
              </div>
            )}
            {isPaymentOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-lg w-80">
                  <h2 className="text-xl font-semibold mb-4">결제하기</h2>
                  <div id="payment-method" />
                  <div id="agreement" />
                  <button
                    onClick={handlePaymentRequest}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    결제하기
                  </button>
                  <button
                    onClick={() => setIsPaymentOpen(false)}
                    className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}

            {/* ✅ 진행 중인 요청이라면 입찰 목록 표시 */}
            {request.status === "open" && request.Bids.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mt-2">입찰 목록</h4>
                {request.Bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="flex justify-between bg-gray-100 p-2 mt-2 rounded"
                  >
                    <p>
                      {bid.User.nickname}: {bid.amount.toLocaleString()}원
                    </p>
                    <button
                      onClick={() => handleSelectBid(request.id, bid.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      선택
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
