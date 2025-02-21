import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/modules/authSlice";
import Footer from "../../components/Footer";
import axios from "axios";

interface LoginProps {
  onChangePage: (
    page:
      | "home"
      | "login"
      | "register"
      | "requests"
      | "requestDetail"
      | "profile"
  ) => void;
}

const Login: React.FC<LoginProps> = ({ onChangePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api-server/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.isSuccess) {
        dispatch(login(res.data.user));
        alert("로그인 성공!");
        onChangePage("profile");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("로그인 실패!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
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
