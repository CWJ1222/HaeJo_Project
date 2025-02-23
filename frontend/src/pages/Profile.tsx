import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../store/modules/authSlice";
import axios from "axios";

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
  status: string;
  selectedBid?: { amount: number; User: { nickname: string } }; // ✅ 추가
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
            req.id === requestId ? { ...req, status: "closed" } : req
          )
        );
      }
    } catch (error) {
      console.error("입찰 선택 실패:", error);
    }
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
            <p>상태: {request.status === "closed" ? "마감됨" : "진행 중"}</p>

            {/* ✅ 마감된 요청일 경우 선택된 입찰 금액 표시 */}
            {request.status === "closed" && request.selectedBid && (
              <p className="text-blue-500 mt-2">
                선택된 입찰 금액: {request.selectedBid.amount.toLocaleString()}
                원 ({request.selectedBid.User.nickname})
              </p>
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
