// src/pages/Auth/Register.tsx
import React from "react";
import Footer from "../../components/Footer";

const Register: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직 처리 (API 연동 등)
    alert("회원가입 요청!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar 제거 */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">회원가입</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded shadow"
        >
          <div className="mb-4">
            <label className="block text-gray-700">이메일</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">닉네임</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">비밀번호</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
