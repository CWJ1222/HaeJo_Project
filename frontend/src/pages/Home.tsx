import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setRequests } from "../store/modules/requests";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import Footer from "../components/Footer";

interface HomeProps {
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

const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  const dispatch = useDispatch();
  const requests = useSelector((state: RootState) => state.requests.requests);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserId = currentUser?.id ?? 0; // Redux에서 로그인한 사용자 ID 가져오기

  useEffect(() => {
    const fetchLatestRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api-server/latest-requests"
        );
        console.log("📌 최신 요청 데이터:", res.data.requests);

        if (res.data.isSuccess) {
          dispatch(setRequests(res.data.requests));
        }
      } catch (error) {
        console.error("최신 요청 목록 불러오기 실패:", error);
      }
    };

    fetchLatestRequests();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <section className="bg-blue-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">해조 플랫폼</h1>
        <p className="mt-4 text-lg">시간을 절약하고, 정보를 쉽게 얻어보세요!</p>
      </section>

      <section className="container mx-auto my-12 px-6">
        <h2 className="text-2xl font-bold mb-6">최근 요청</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              id={request.id}
              title={request.title}
              budget={`${request.budget.toLocaleString()}원`}
              user={
                request.User && "id" in request.User
                  ? {
                      id: request.User.id as number,
                      nickname: request.User.nickname,
                    }
                  : { id: 0, nickname: "알 수 없음" }
              }
              currentUserId={currentUserId}
              onChangePage={onChangePage} // 로그인 이동 가능하도록 전달
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => onChangePage("requests")}
            className="text-blue-500 font-semibold"
          >
            더 많은 요청 보기 →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
