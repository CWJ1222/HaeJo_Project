// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export function RedirectPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const status = searchParams.get("status");
//     if (status === "success") {
//       navigate(`/success${window.location.search}`);
//     } else {
//       navigate(`/fail${window.location.search}`);
//     }
//   }, [navigate, searchParams]);

//   return <h2>🚀 리디렉팅 중...</h2>;
// }
