import React from "react";
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
  const requests = [
    {
      id: 1,
      title: "1만원 정도의 가성비 좋은 유선 이어폰 찾아줘!",
      budget: "10,000원",
      user: "user1",
    },
    {
      id: 2,
      title: "서울에서 예쁜 커스텀 케이크 가게 추천해줘!",
      budget: "상관없음",
      user: "user2",
    },
    {
      id: 3,
      title: "쿠팡, 네이버, 11번가 가격 비교해서 최저가 찾아줘!",
      budget: "무료 요청",
      user: "user3",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <section className="bg-blue-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">해조 플랫폼</h1>
        <p className="mt-4 text-lg">시간을 절약하고, 정보를 쉽게 얻어보세요!</p>
        <div className="mt-6 space-x-4"></div>
      </section>

      <section className="container mx-auto my-12 px-6">
        <h2 className="text-2xl font-bold mb-6">최근 요청</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              title={request.title}
              budget={request.budget}
              user={request.user}
              onClick={() => onChangePage("bid")} // 🔥 onClick 추가
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
