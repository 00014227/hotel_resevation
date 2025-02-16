"use client";
import { useState, useEffect } from "react";

export default function HotelChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("");

  useEffect(() => {
    // Auto-start chat when component loads
    startChat();
  }, []);

  async function startChat() {
    const response = await fetch("/api/hotel-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "", step: "" }),
    });

    const data = await response.json();
    setMessages([{ role: "bot", text: data.reply }]);
    setStep(data.step);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);

    const response = await fetch("/api/hotel-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, step }),
    });

    const data = await response.json();
    setMessages([...messages, userMessage, { role: "bot", text: data.reply }]);
    setStep(data.step);
    setInput("");
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <div className="h-80 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${
              msg.role === "bot" ? "bg-gray-200 text-left" : "bg-blue-500 text-white text-right"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-md"
          placeholder="Введите сообщение..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
