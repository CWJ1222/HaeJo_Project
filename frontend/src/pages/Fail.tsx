import { useSearchParams, useNavigate } from "react-router-dom";

export function FailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-red-500">❌ 결제 실패</h2>
      <p>에러 코드: {searchParams.get("code")}</p>
      <p>메시지: {searchParams.get("message")}</p>
      <button
        onClick={() => navigate("/profile")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        프로필로 돌아가기
      </button>
    </div>
  );
}
