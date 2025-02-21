import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Requests from "./pages/Requests/Requests";
import RequestDetail from "./pages/Requests/RequestDetatil";
import Profile from "./pages/Profile";
import ChatRoom from "./pages/Chat";
import BidPage from "./pages/Requests/BidPage";

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
  >("home");

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
        return <Profile />;
      case "chat":
        return <ChatRoom />;
      case "bid":
        return <BidPage onChangePage={setPage} />;
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
