// src/components/Navbar.tsx
import React from "react";

interface NavbarProps {
  onChangePage: (
    page: "home" | "login" | "register" | "requests" | "requestDetail"
  ) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onChangePage }) => {
  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* 로고 클릭 시 홈으로 이동 */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => onChangePage("home")}
        >
          해조 플랫폼
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="space-x-6">
          <button
            onClick={() => onChangePage("requests")}
            className="hover:text-gray-200"
          >
            요청 목록
          </button>
          <button
            onClick={() => onChangePage("register")}
            className="hover:text-gray-200"
          >
            회원가입
          </button>
          <button
            onClick={() => onChangePage("login")}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold shadow-md"
          >
            로그인
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
