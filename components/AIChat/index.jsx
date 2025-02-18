import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { MessageCircle, MapPin, Calendar, Tag, Search } from "lucide-react";

export default function ChatBot() {
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello! How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");
    const [hotels, setHotels] = useState([]);

    const features = [
        { label: "Find Hotels", icon: <Search size={18} /> },
        { label: "Multi-City Search", icon: <MapPin size={18} /> },
        { label: "Dynamic Pricing", icon: <Tag size={18} /> },
        { label: "Nearby Attractions", icon: <Calendar size={18} /> },
    ];

    const handleSearch = () => {
        if (input.trim() === "") return;

        // Simulating fetching hotel results
        const fakeHotels = [
            { id: 1, name: "Grand Hotel", price: "$200", location: "New York", image: "https://via.placeholder.com/150" },
            { id: 2, name: "Cozy Inn", price: "$150", location: "Los Angeles", image: "https://via.placeholder.com/150" },
            { id: 1, name: "Grand Hotel", price: "$200", location: "New York", image: "https://via.placeholder.com/150" },
            { id: 2, name: "Cozy Inn", price: "$150", location: "Los Angeles", image: "https://via.placeholder.com/150" },
        ];

        setHotels(fakeHotels);
        setMessages([...messages, { role: "user", text: input }, { role: "bot", text: "Here are some hotels for you:" }]);
        setInput("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open AI Assistant</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[70vw] p-5 rounded-2xl">
                <div className="flex flex-col space-y-4">
                    {/* Chat Header */}
                    <div className="text-xl font-semibold flex items-center gap-2">
                        <MessageCircle size={24} /> AI Travel Assistant
                    </div>

                    {/* Chat Window */}
                    <div className="bg-gray-100 p-4 rounded-lg h-[300px] overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 my-1 rounded-lg max-w-xs ${msg.role === "bot" ? "bg-blue-500 text-white self-start" : "bg-gray-300 self-end"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* User Input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter city or preferences..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="border p-2 rounded-lg flex-1"
                        />
                        <Button onClick={handleSearch}>Search</Button>
                    </div>

                    {/* Suggested Features  we need to remove to other file!!!!!!*/}
                    <Tabs defaultValue={features[0].label} className="w-full">
                        <TabsList className="flex gap-2 flex-wrap">
                            {features.map((feature) => (
                                <TabsTrigger key={feature.label} value={feature.label}>
                                    {feature.icon} {feature.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {features.map((feature) => (
                            <TabsContent key={feature.label} value={feature.label}>
                                <p className="text-gray-600">{`You selected: ${feature.label}`}</p>
                            </TabsContent>
                        ))}
                    </Tabs>

                    {/* Hotel Results we can also create separeate folder to it */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 overflow-y-auto">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="border p-4 rounded-lg">
                                <img src={hotel.image} alt={hotel.name} className="w-full h-32 object-cover rounded-lg" />
                                <h3 className="font-semibold mt-2">{hotel.name}</h3>
                                <p className="text-sm text-gray-500">{hotel.location}</p>
                                <p className="font-bold">{hotel.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
