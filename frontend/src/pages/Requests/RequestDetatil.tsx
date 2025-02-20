// src/pages/Requests/RequestDetail.tsx
import React from "react";

import Footer from "../../components/Footer";

// props로 id를 전달받는 예시
interface RequestDetailProps {
  id?: number;
}

const RequestDetail: React.FC<RequestDetailProps> = ({ id }) => {
  // 실제 API 연동 시, props로 받은 id를 이용해 해당 요청 데이터를 가져오면 됩니다.

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">요청 상세 정보</h1>
        <p className="mb-2 text-gray-600">현재 요청 ID: {id}</p>
        {/* 요청 상세 데이터 표시 영역 */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">[예시] 요청 제목</h2>
          <p className="mt-2">[예시] 예산: 10,000원</p>
          <p className="mt-2">[예시] 요청자: user1</p>
          <p className="mt-4 text-gray-600">
            여기서부터는 해당 요청의 상세 설명, 입찰 내역, 진행 상황 등을
            표시합니다.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RequestDetail;
