"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatBot from "@/components/AIChat";
import Image from "next/image";

export default function HotelChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("");
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [amenities, setAmenities] = useState("");
  const router = useRouter();


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

    // Track input based on step
    let updatedLocation = location;
    let updatedBudget = budget;
    let updatedAmenities = amenities;

    if (step === "location") updatedLocation = input;
    if (step === "budget") updatedBudget = input;
    if (step === "amenities") updatedAmenities = input;

    const response = await fetch("/api/hotel-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        step,
        location: updatedLocation,
        budget: updatedBudget,
        amenities: updatedAmenities,
      }),
    });

    const data = await response.json();
    console.log(data, 'iiiiii')
    setMessages([...messages, userMessage, { role: "bot", text: data.reply }]);
    setStep(data.step);
    setHotels(data.hotels || []);
    setInput("");

    // Update state variables
    setLocation(updatedLocation);
    setBudget(updatedBudget);
    setAmenities(updatedAmenities);
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <ChatBot/>
      <div className="h-80 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${msg.role === "bot" ? "bg-gray-200 text-left" : "bg-blue-500 text-white text-right"}`}
          >
            {msg.text}
          </div>
        ))}
        {hotels.length > 0 && (
          <div>
            <h3 className="mt-2 font-semibold">Recommended Hotels:</h3>
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="p-2 border rounded-md my-2 cursor-pointer hover:bg-gray-100"
                onClick={() => router.push(`/hotel/${hotel.id}`)}
              >
                <Image
                  src={hotel.image_url?.[0]}
                  alt={hotel.name}
                  width={400}
                  height={300}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <h4 className="font-bold">{hotel.name}</h4>
                <p>{hotel.address?.city || "Unknown City"}</p>
                <p>${hotel.price} per night</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-md"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
          ➤
        </button>
      </div>
    </div>
  );
}
