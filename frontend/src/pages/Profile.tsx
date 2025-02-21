import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../store/modules/authSlice";
import axios from "axios";

interface ProfileProps {
  onChangePage: (
    page: "home" | "login" | "register" | "requests" | "profile"
  ) => void;
}

const Profile: React.FC<ProfileProps> = ({ onChangePage }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [password, setPassword] = useState("");

  // Redux에 user 정보가 없을 경우, 백엔드에서 다시 불러오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api-server/session",
          {
            withCredentials: true,
          }
        );

        if (res.data.isAuthenticated) {
          dispatch(login(res.data.user));
        } else {
          onChangePage("login"); // 로그인 안되어 있으면 로그인 페이지로 이동
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 실패:", error);
      }
    };

    if (!user) {
      fetchUserProfile();
    }
  }, [user, dispatch, onChangePage]);

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/api-server/update-profile",
        { nickname, password },
        { withCredentials: true }
      );

      if (res.data.isSuccess) {
        dispatch(
          login({
            id: user?.id || 0, // ✅ id 추가
            email: user?.email || "",
            nickname,
          })
        );
        alert("프로필이 업데이트되었습니다.");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto my-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">로그인이 필요합니다.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">내 프로필</h1>

      <div className="mb-4">
        <label className="block text-gray-700">이메일 (수정 불가)</label>
        <input
          type="email"
          value={user.email}
          className="w-full border px-3 py-2 rounded bg-gray-100"
          disabled
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          비밀번호 (변경하려면 입력)
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="새 비밀번호 입력"
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        변경사항 저장
      </button>
    </div>
  );
};

export default Profile;
