import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Footer from "../components/Footer";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">마이프로필</h1>
        {user ? (
          <>
            <p>환영합니다, {user.nickname}님!</p>
            <p>이메일: {user.email}</p>
          </>
        ) : (
          <p>로그인이 필요합니다.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
