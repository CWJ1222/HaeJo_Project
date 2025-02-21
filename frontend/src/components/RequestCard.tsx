import React from "react";

interface RequestProps {
  title: string;
  budget: string;
  user: string;
  onClick?: () => void;
}

const RequestCard: React.FC<RequestProps> = ({
  title,
  budget,
  user,
  onClick,
}) => {
  return (
    <div
      className="bg-white p-4 shadow-lg rounded-lg cursor-pointer hover:shadow-xl"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">예산: {budget}</p>
      <p className="text-sm text-gray-500">등록자: {user}</p>
    </div>
  );
};

export default RequestCard;
