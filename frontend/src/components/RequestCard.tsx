import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BidModal from "./BidModal";

interface RequestProps {
  id: number;
  title: string;
  budget: string;
  user: string;
  currentUserId: number;
  onChangePage: (page: "login" | "bid") => void;
}

const RequestCard: React.FC<RequestProps> = ({
  id,
  title,
  budget,
  user,
  currentUserId,
  onChangePage,
}) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleBidClick = () => {
    if (!isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      onChangePage("login"); // 로그인 페이지로 이동
      return;
    }
    setIsBidModalOpen(true);
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">예산: {budget}</p>
      <p className="text-sm text-gray-500">등록자: {user}</p>
      <button
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleBidClick}
      >
        입찰하기
      </button>

      {isBidModalOpen && (
        <BidModal
          requestId={id}
          userId={currentUserId}
          onClose={() => setIsBidModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RequestCard;
