import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import Footer from "../../components/Footer";
import RequestCard from "../../components/RequestCard";
import { RequestItem } from "../../types/request";

interface RequestsProps {
  onChangePage: (
    page:
      | "home"
      | "login"
      | "register"
      | "requests"
      | "requestDetail"
      | "profile"
      | "chat"
      | "bid"
  ) => void;
}

const Requests: React.FC<RequestsProps> = ({ onChangePage }) => {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const [sort, setSort] = useState<"budget" | "time">("time"); // ✅ 기본 정렬: 최신순
  const limit = 5; // 한 페이지에 5개 표시

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserId = currentUser?.id ?? 0;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api-server/requests?page=${page}&limit=${limit}&sort=${sort}`
        );

        if (res.data.isSuccess) {
          setRequests(res.data.requests);
          setTotalRequests(res.data.totalRequests);
        }
      } catch (error) {
        console.error("요청 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [page, sort]);

  const totalPages = Math.ceil(totalRequests / limit);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">요청 목록</h1>

        {/* ✅ 정렬 선택 드롭다운 */}
        <div className="mb-4">
          <label className="mr-2">정렬 기준:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "budget" | "time")}
            className="border px-2 py-1 rounded"
          >
            <option value="time">최신 등록 순</option>
            <option value="budget">예산 높은 순</option>
          </select>
        </div>

        {loading ? (
          <p>로딩 중...</p>
        ) : requests.length === 0 ? (
          <p>등록된 요청이 없습니다.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((req) => (
                <RequestCard
                  key={req.id}
                  id={req.id}
                  title={req.title}
                  budget={`${req.budget.toLocaleString()}원`}
                  user={
                    req.User
                      ? { id: req.User.id, nickname: req.User.nickname }
                      : { id: 0, nickname: "알 수 없음" }
                  }
                  currentUserId={currentUserId}
                  onChangePage={onChangePage}
                />
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    page === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Requests;
