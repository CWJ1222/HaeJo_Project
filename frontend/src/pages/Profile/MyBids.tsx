import React, { useState } from "react";
import { MyBid } from "../../types/bid";
import ReportModal from "../../components/ReportModal"; // ✅ 리포트 모달 추가

interface MyBidsProps {
  myBids: MyBid[];
}

const statusText: { [key: string]: string } = {
  open: "진행 중",
  closed: "마감됨",
  paid: "결제 완료",
  draft: "작성 중",
  submitted: "제출됨",
  completed: "완료됨",
};

const MyBids: React.FC<MyBidsProps> = ({ myBids }) => {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  return (
    <div>
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

            {/* ✅ 요청 상태 표시 */}
            <p className="mt-2 text-sm font-semibold">
              상태: {statusText[bid.Request.status] || "알 수 없음"}
            </p>

            {/* ✅ 상태가 '결제 완료'일 경우 리포트 작성 버튼 활성화 */}
            {bid.Request.status === "paid" && (
              <button
                onClick={() => setSelectedRequestId(bid.Request.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                리포트 작성
              </button>
            )}
          </div>
        ))
      )}
      {/* ✅ 리포트 모달 */}
      {selectedRequestId && (
        <ReportModal
          requestId={selectedRequestId}
          onClose={() => setSelectedRequestId(null)}
        />
      )}
    </div>
  );
};

export default MyBids;
