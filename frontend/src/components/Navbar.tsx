import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* 로고 */}
        <a href="/" className="text-2xl font-bold">
          해조 플랫폼
        </a>

        {/* 네비게이션 메뉴 */}
        <div className="space-x-6">
          <a href="/requests" className="hover:text-gray-200">
            요청 목록
          </a>
          <a href="/register" className="hover:text-gray-200">
            회원가입
          </a>
          <a
            href="/login"
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold shadow-md"
          >
            로그인
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
