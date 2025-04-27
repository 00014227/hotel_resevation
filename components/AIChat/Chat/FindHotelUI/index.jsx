"use client";

import React from "react";
import HotelResults from "../../HotelResults";

export default function FindHotelUI({ messages }) {
  return (
    <div className="flex flex-col space-y-2 p-4 ">
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg max-w-xs  shadow-md ${
            msg.role === "bot"
              ? "bg-blue-500 text-white self-start"
              : "bg-gray-300 text-black self-end"
          }`}
        >
          {msg.text}
        </div>
      ))}

    </div>
  );
}
