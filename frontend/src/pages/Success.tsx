import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function confirmPayment() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api-server/confirm",
          {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
          }
        );

        if (response.data.success) {
          alert("결제가 완료되었습니다!");
          navigate("/profile"); // ✅ 프로필 페이지로 이동
        } else {
          navigate(`/fail?code=500&message=결제 승인 실패`);
        }
      } catch (error) {
        console.error("결제 승인 오류:", error);
        navigate(`/fail?code=500&message=결제 승인 중 오류 발생`);
      }
    }

    confirmPayment();
  }, [searchParams, navigate]);

  return <h2>🎉 결제가 완료되었습니다!</h2>;
}
