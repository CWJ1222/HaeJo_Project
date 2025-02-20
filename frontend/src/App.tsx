// src/App.tsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Requests from "./pages/Requests/Requests";
import RequestDetail from "./pages/Requests/RequestDetatil";

function App() {
  // 현재 보여줄 페이지를 상태로 관리 (기본값: "home")
  const [page, setPage] = useState<
    "home" | "login" | "register" | "requests" | "requestDetail"
  >("home");

  // 각 페이지를 조건부로 렌더링
  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "requests":
        return <Requests />;
      case "requestDetail":
        // 예시로, 임의의 id=1을 넘겨줌
        return <RequestDetail id={1} />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {/* 네비게이션 메뉴는 Navbar 컴포넌트에서 처리 */}
      <Navbar onChangePage={setPage} />
      {renderPage()}
    </div>
  );
}

export default App;
