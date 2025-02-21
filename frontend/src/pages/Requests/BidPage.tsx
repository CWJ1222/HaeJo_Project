import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBid } from "../../store/modules/bids";
import Footer from "../../components/Footer";

interface BidPageProps {
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

const BidPage: React.FC<BidPageProps> = ({ onChangePage }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return alert("입찰 금액을 입력하세요.");

    dispatch(
      addBid({
        id: Math.floor(Math.random() * 1000),
        requestId: 1, // 요청 ID는 예시 (추후 상태 관리 필요)
        amount: parseInt(amount, 10),
        user: "현재 로그인한 사용자",
      })
    );

    alert("입찰이 완료되었습니다.");
    onChangePage("requests"); // 입찰 후 요청 목록으로 이동
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">입찰 페이지</h1>
        <form
          onSubmit={handleBidSubmit}
          className="mt-6 bg-white p-6 rounded shadow"
        >
          <label className="block text-gray-700">입찰 금액</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-2"
            placeholder="입찰 금액을 입력하세요"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            입찰하기
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BidPage;
