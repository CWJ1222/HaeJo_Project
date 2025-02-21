import React, { useEffect, useState } from "react";
import axios from "axios";

interface BidModalProps {
  requestId: number;
  userId: number;
  onClose: () => void;
}

const BidModal: React.FC<BidModalProps> = ({ requestId, userId, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 사용자의 기존 입찰 금액 조회
    const fetchUserBid = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api-server/bid/${requestId}/${userId}`
        );
        if (res.data.isSuccess) {
          setAmount(res.data.bid.amount.toString());
          setIsEditing(true);
        }
      } catch (err) {
        console.error("입찰 정보 가져오기 오류:", err);
      }
    };

    fetchUserBid();
  }, [requestId, userId]);

  const handleBidSubmit = async () => {
    if (!amount) return alert("입찰 금액을 입력하세요.");

    try {
      const res = await axios.post("http://localhost:8080/api-server/bid", {
        requestId,
        userId,
        amount: parseInt(amount, 10),
      });

      alert(res.data.message);
      onClose(); // 모달 닫기
    } catch (err) {
      console.error("입찰 오류:", err);
      alert("입찰 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "입찰 수정" : "새 입찰"}
        </h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded mt-2"
          placeholder="입찰 금액을 입력하세요"
        />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            취소
          </button>
          <button
            onClick={handleBidSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isEditing ? "수정하기" : "입찰하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
