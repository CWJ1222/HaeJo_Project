import React from "react";
import Footer from "../../components/Footer";
import RequestCard from "../../components/RequestCard";

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
  const mockRequests = [
    {
      id: 1,
      title: "가성비 좋은 이어폰 추천",
      budget: "10,000원",
      user: "user1",
    },
    {
      id: 2,
      title: "서울 커스텀 케이크 가게 추천",
      budget: "상관없음",
      user: "user2",
    },
    {
      id: 3,
      title: "최저가 가격 비교 요청",
      budget: "무료 요청",
      user: "user3",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">요청 목록</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRequests.map((req) => (
            <RequestCard
              key={req.id}
              title={req.title}
              budget={req.budget}
              user={req.user}
              onClick={() => onChangePage("bid")} // 클릭하면 입찰 페이지로 이동
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Requests;
