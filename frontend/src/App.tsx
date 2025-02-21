import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "./store/modules/authSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Requests from "./pages/Requests/Requests";
import RequestDetail from "./pages/Requests/RequestDetatil";
import Profile from "./pages/Profile";
import ChatRoom from "./pages/Chat";
import BidPage from "./pages/Requests/BidPage";
import RequestCreate from "./pages/Requests/RequestCreate"; // ✅ 추가

function App() {
  const [page, setPage] = useState<
    | "home"
    | "login"
    | "register"
    | "requests"
    | "requestDetail"
    | "profile"
    | "chat"
    | "bid"
    | "requestCreate" // ✅ 추가
  >("home");

  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api-server/session",
          {
            withCredentials: true,
          }
        );

        if (res.data.isAuthenticated) {
          dispatch(login(res.data.user));
        }
      } catch (error) {
        console.error("세션 확인 실패:", error);
      }
    };

    checkSession();
  }, [dispatch]);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onChangePage={setPage} />;
      case "login":
        return <Login onChangePage={setPage} />;
      case "register":
        return <Register onChangePage={setPage} />;
      case "requests":
        return <Requests onChangePage={setPage} />;
      case "requestDetail":
        return <RequestDetail />;
      case "profile":
        return <Profile onChangePage={setPage} />;
      case "chat":
        return <ChatRoom />;
      case "bid":
        return <BidPage onChangePage={setPage} />;
      case "requestCreate": // ✅ 추가된 요구하기 페이지
        return <RequestCreate onChangePage={setPage} />;
      default:
        return <Home onChangePage={setPage} />;
    }
  };

  return (
    <div>
      <Navbar onChangePage={setPage} />
      {renderPage()}
    </div>
  );
}

export default App;
