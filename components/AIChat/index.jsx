import React, { useState, useEffect} from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { MessageCircle, MapPin, Calendar, Tag, Search } from "lucide-react";
import AITabs from "./Tabs";
import HotelResults from "./HotelResults";
import { useDispatch, useSelector } from "react-redux";
import { useAIFindHotel } from "@/app/hooks/aiChatBot/useAIFindHotel";
import FindHotelUI from "./Chat/FindHotelUI";
import AIChat from "./Chat";

export default function ChatBot() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const { messages, handleUserInput, fetchNextQuestion, useAIFindHotel2} = useAIFindHotel()

    const handleSendMessage = () => {
        if (input.trim() === "") return;
        handleUserInput(input);
        setInput(""); // Clear input field after sending
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open AI Assistant</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[70vw] p-5 rounded-2xl">
                <div className="flex flex-col space-y-4">
                    {/* Chat Header */}
                    <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                        <MessageCircle size={24} /> AI Travel Assistant
                    </DialogTitle>

                    {/* Chat Window */}
                    <div className="bg-gray-100 p-4 rounded-lg h-[300px] overflow-y-auto">
                        <AIChat messages={messages}/>
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
                        <Button onClick={handleSendMessage}>Search</Button>
                    </div>

                    <AITabs action={useAIFindHotel2}/>

                    {/* Hotel Results we can also create separeate folder to it */}
                    <HotelResults/>
                </div>
            </DialogContent>
        </Dialog>
    );
}
