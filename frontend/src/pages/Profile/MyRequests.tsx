// import React from "react";
// import { RequestItem } from "../../types/request";

// interface MyRequestsProps {
//   myRequests: RequestItem[];
//   handlePaymentClick: (request: RequestItem) => void;
//   handleSelectBid: (requestId: number, bidId: number) => void;
// }

// const statusText: { [key: string]: string } = {
//   open: "진행 중",
//   closed: "마감됨",
//   paid: "결제 완료",
//   draft: "작성 중",
//   submitted: "제출됨",
//   completed: "완료됨",
// };

// const MyRequests: React.FC<MyRequestsProps> = ({
//   myRequests,
//   handlePaymentClick,
//   handleSelectBid,
// }) => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mt-8">내 요청 목록</h2>

//       {myRequests.length === 0 ? (
//         <p className="mt-4">등록된 요청이 없습니다.</p>
//       ) : (
//         myRequests.map((request) => (
//           <div key={request.id} className="border p-4 mb-4">
//             <h3 className="text-lg font-bold">{request.title}</h3>
//             <p>예산: {request.budget.toLocaleString()}원</p>

//             <p className="mt-2 text-sm font-semibold">
//               상태: {statusText[request.status] || "알 수 없음"}
//             </p>

//             {/* ✅ 마감된 요청일 경우 선택된 입찰 금액 표시 */}
//             {request.status === "closed" && request.selectedBid && (
//               <div>
//                 <p className="text-blue-500 mt-2">
//                   선택된 입찰 금액:{" "}
//                   {request.selectedBid.amount.toLocaleString()}원 (
//                   {request.selectedBid.User.nickname})
//                 </p>
//                 <button
//                   onClick={() => handlePaymentClick(request)}
//                   className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                 >
//                   결제하기
//                 </button>
//               </div>
//             )}

//             {/* ✅ 진행 중인 요청이라면 입찰 목록 표시 */}
//             {request.status === "open" && request.Bids.length > 0 && (
//               <div>
//                 <h4 className="text-lg font-semibold mt-2">입찰 목록</h4>
//                 {request.Bids.map((bid) => (
//                   <div
//                     key={bid.id}
//                     className="flex justify-between bg-gray-100 p-2 mt-2 rounded"
//                   >
//                     <p>
//                       {bid.User.nickname}: {bid.amount.toLocaleString()}원
//                     </p>
//                     <button
//                       onClick={() => handleSelectBid(request.id, bid.id)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       선택
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyRequests;
