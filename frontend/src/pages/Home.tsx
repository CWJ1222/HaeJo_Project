import React from "react";
import Navbar from "../components/Navbar";
import RequestCard from "../components/RequestCard";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  // 요청 데이터 예시 (실제 데이터는 API에서 가져와야 함)
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
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">해조 플랫폼</h1>
        <p className="mt-4 text-lg">시간을 절약하고, 정보를 쉽게 얻어보세요!</p>
        <div className="mt-6 space-x-4">
          <a
            href="/register"
            className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            회원가입
          </a>
          <a
            href="/requests"
            className="bg-gray-200 text-blue-500 px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            요청 보러가기
          </a>
        </div>
      </section>

      {/* 요청 목록 미리보기 */}
      <section className="container mx-auto my-12 px-6">
        <h2 className="text-2xl font-bold mb-6">최근 요청</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              title={request.title}
              budget={request.budget}
              user={request.user}
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="/requests" className="text-blue-500 font-semibold">
            더 많은 요청 보기 →
          </a>
        </div>
      </section>

      {/* 신뢰도 강조 */}
      <section className="bg-gray-200 py-12 text-center">
        <h2 className="text-2xl font-bold">안전한 거래 시스템</h2>
        <p className="mt-4 text-gray-700">
          요청자는 제공자의 평점과 입찰 내역을 확인한 후 선택할 수 있습니다.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
