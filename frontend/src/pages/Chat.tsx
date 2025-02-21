// src/pages/Chat/ChatRoom.tsx
import React, { useState } from "react";
import Footer from "../components/Footer";

interface Message {
  id: number;
  sender: string;
  text: string;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "user1", text: "안녕하세요!" },
    { id: 2, sender: "user2", text: "안녕하세요! 요청 확인하셨나요?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        sender: "me",
        text: inputMessage,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 채팅방 제목 */}
      <div className="bg-blue-500 text-white text-lg font-bold px-6 py-4 shadow-md">
        채팅방 - user2
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-grow p-6 overflow-auto bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.sender === "me" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg shadow ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 입력 폼 */}
      <div className="flex items-center p-4 bg-gray-200">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={sendMessage}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          전송
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ChatRoom;
