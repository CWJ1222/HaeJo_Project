// src/pages/Auth/Login.tsx
import React from "react";
import Footer from "../../components/Footer";

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("로그인 요청!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* App.tsx에서 이미 Navbar를 렌더링하므로 여기서는 제거 */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">로그인</h1>
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
            로그인
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
