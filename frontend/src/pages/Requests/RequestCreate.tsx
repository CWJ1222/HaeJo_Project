import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import Footer from "../../components/Footer";

interface RequestCreateProps {
  onChangePage: (page: "home" | "requests" | "requestCreate") => void;
}

const RequestCreate: React.FC<RequestCreateProps> = ({ onChangePage }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !budget) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api-server/request",
        {
          title,
          description,
          budget: parseInt(budget, 10),
          userId: user?.id,
        },
        { withCredentials: true }
      );

      if (res.data.isSuccess) {
        alert("요청이 성공적으로 등록되었습니다.");
        onChangePage("requests");
      } else {
        alert("요청 등록 실패!");
      }
    } catch (err) {
      console.error("요청 등록 오류:", err);
      alert("요청 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">새 요청 등록</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded shadow"
        >
          <div className="mb-4">
            <label className="block text-gray-700">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="요청 제목 입력"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="요청 상세 내용 입력"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">예산 (원)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="예산 입력"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            요청 등록
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RequestCreate;
