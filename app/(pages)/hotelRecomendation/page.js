"use client"

import { useState } from "react";

export default function HotelRecommendation() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const response = await fetch("/api/hotel-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await response.json();
    setMessages([...messages, userMessage, { role: "assistant", content: data.reply }]);
    setInput("");
  };

  return (
    <div>
      <h1>Подбор отелей</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <strong>{msg.role === "user" ? "Вы: " : "Бот: "}</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Напишите запрос..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
}
