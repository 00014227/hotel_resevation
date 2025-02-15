"use client";

import { useState } from "react";

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const response = await fetch("/api/hotel-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { role: "assistant", content: data.reply };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Чат с AI (рекомендации отелей)</h1>
      <div className="border p-4 h-80 overflow-auto">
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === "user" ? "text-blue-500" : "text-green-500"}>
            {msg.content}
          </p>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="border p-2 flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите ваш запрос..."
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={sendMessage}>
          Отправить
        </button>
      </div>
    </div>
  );
}
