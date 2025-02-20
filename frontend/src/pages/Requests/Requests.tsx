// src/pages/Requests/Requests.tsx
import React from "react";

import Footer from "../../components/Footer";
import RequestCard from "../../components/RequestCard";

const Requests: React.FC = () => {
  // 실제로는 API 호출로 가져올 데이터
  const mockRequests = [
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
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Requests;
