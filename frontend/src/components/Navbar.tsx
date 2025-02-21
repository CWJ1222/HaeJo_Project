import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/modules/authSlice";
import { RootState } from "../store/store";
import axios from "axios";

interface NavbarProps {
  onChangePage: (
    page:
      | "home"
      | "login"
      | "register"
      | "requests"
      | "requestDetail"
      | "profile"
      | "chat"
      | "bid"
      | "requestCreate" // 추가된 요청 작성 페이지
  ) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onChangePage }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api-server/logout", {
        withCredentials: true,
      });

      if (res.data.isSuccess) {
        dispatch(logout());
        alert("로그아웃 되었습니다.");
        onChangePage("home");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => onChangePage("home")}
        >
          해조 플랫폼
        </div>
        <div className="space-x-6">
          <button
            onClick={() => onChangePage("requests")}
            className="hover:text-gray-200"
          >
            요청 목록
          </button>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => onChangePage("requestCreate")}
                className="hover:text-gray-200"
              >
                요구하기
              </button>
              <button
                onClick={() => onChangePage("chat")}
                className="hover:text-gray-200"
              >
                채팅
              </button>
              <button
                onClick={() => onChangePage("profile")}
                className="hover:text-gray-200"
              >
                프로필
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
