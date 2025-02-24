import React from "react";
import { MyBid } from "../../types/bid";

interface MyBidsProps {
  myBids: MyBid[];
}

const MyBids: React.FC<MyBidsProps> = ({ myBids }) => {
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
          </div>
        ))
      )}
    </div>
  );
};

export default MyBids;
