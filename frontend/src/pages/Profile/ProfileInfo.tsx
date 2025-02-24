import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/modules/authSlice";
import { User } from "../../types/user"; // ✅ 사용자 타입 가져오기

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [password, setPassword] = useState("");

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
            id: user?.id || 0,
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

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">내 프로필</h2>

      <div className="mb-6">
        <label className="block text-gray-700">이메일 (수정 불가)</label>
        <input
          type="email"
          value={user.email}
          className="w-full border px-3 py-2 rounded bg-gray-100"
          disabled
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-6">
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

export default ProfileInfo;
