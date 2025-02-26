import React from "react";

interface ViewReportModalProps {
  report: {
    content: string;
    imageUrl?: string;
  };
  onClose: () => void;
}

const ViewReportModal: React.FC<ViewReportModalProps> = ({
  report,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">리포트 내용</h2>
        <p className="mb-4">{report.content}</p>

        {/* ✅ 이미지가 있으면 표시 */}
        {report.imageUrl && (
          <img
            src={report.imageUrl} // ✅ 백엔드에서 절대 경로를 반환하도록 수정했음
            alt="리포트 이미지"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
            className="mb-4 w-full h-auto"
            onError={(e) => (e.currentTarget.style.display = "none")} // 오류 발생 시 숨기기
          />
        )}

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ViewReportModal;
