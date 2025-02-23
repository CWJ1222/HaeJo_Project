import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function confirm() {
      const response = await fetch("http://localhost:8080/api-server/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: searchParams.get("orderId"),
          amount: searchParams.get("amount"),
          paymentKey: searchParams.get("paymentKey"),
        }),
      });

      if (!response.ok) {
        navigate(`/fail?code=${response.status}&message=결제 승인 실패`);
      } else {
        navigate("/profile"); // ✅ 결제 성공 후 프로필 페이지로 이동
      }
    }

    confirm();
  }, [searchParams, navigate]);

  return <h2>🎉 결제가 완료되었습니다!</h2>;
}
