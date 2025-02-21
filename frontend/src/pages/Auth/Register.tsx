// src/pages/Auth/Register.tsx
import React, { useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";

// onChangePage prop 추가 (타입 정의)
interface RegisterProps {
  onChangePage: (
    page: "home" | "login" | "register" | "requests" | "requestDetail"
  ) => void;
}

const Register: React.FC<RegisterProps> = ({ onChangePage }) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api-server/register",
        {
          email,
          nickname,
          password,
        }
      );
      if (res.data.isSuccess) {
        alert("회원가입 성공! 로그인하세요.");
        onChangePage("login");
      }
    } catch (err) {
      alert("회원가입 실패!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar 제거 (App.tsx에서 관리) */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
