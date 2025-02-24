import React, { useState } from "react";
import axios from "axios";

interface ReportModalProps {
  requestId: number;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ requestId, onClose }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("requestId", requestId.toString());
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api-server/report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("리포트가 제출되었습니다.");
      onClose();
    } catch (error) {
      console.error("리포트 제출 오류:", error);
      alert("리포트 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal">
      <h2>리포트 작성</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리포트 내용을 입력하세요."
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button onClick={handleSubmit}>제출하기</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default ReportModal;
