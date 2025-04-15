import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "@/app/lib/features/AIChat/aiChat.thunk";
import { addChatComponent } from "@/app/lib/features/AIChat/aichat.slice";

export function useAIFindHotel() {
    const dispatch = useDispatch();
    const hotels = useSelector((state) => state.aichat.hotels);
    const isLoading = useSelector((state) => state.aichat.isLoading);
    const error = useSelector((state) => state.aichat.error);

    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello! How can I assist you today?" },
    ]);
    
    const [userPreferences, setUserPreferences] = useState({});
    const [isProcessing, setIsProcessing] = useState(false); 

    // ✅ Fetch next AI-generated question
    async function fetchNextQuestion(updatedPreferences) {
        try {
            const response = await fetch("/api/hotel-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userPreferences: updatedPreferences }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            return data.nextQuestion || "Would you like to refine your search further?";
        } catch (error) {
            console.error("API Fetch Error:", error);
            return "I'm having trouble understanding. Can you clarify?";
        }
    }

    // ✅ Handle user input and update preferences
    async function handleUserInput(input) {
        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setIsProcessing(true);
        
        setUserPreferences((prev) => {
            const updatedPreferences = { ...prev };

            if (!prev.location) updatedPreferences.location = input;
            else if (!prev.budget) updatedPreferences.budget = input;
            else if (!prev.amenities) updatedPreferences.amenities = input.split(",");

            return updatedPreferences;
        });

        setIsProcessing(false);
    }

    // ✅ Fetch next question when user updates preferences
    useEffect(() => {
        if (isProcessing) return; // Prevents multiple triggers

        async function processNextQuestion() {
            if (Object.keys(userPreferences).length === 0) return;

            if(hotels.length > 0) return

            const nextQuestion = await fetchNextQuestion(userPreferences);
            setMessages((prev) => [...prev, { role: "bot", text: nextQuestion }]);
        }

        processNextQuestion();

        if (userPreferences.location && userPreferences.budget && userPreferences.amenities) {
            dispatch(fetchHotels(userPreferences));
            setMessages((prev) => [...prev, { role: "bot", text: "Here are some hotels based on your preferences!" }]);
        }
    }, [userPreferences, dispatch, hotels.length, isProcessing]);

    // ✅ Start the AI Chat
    const useAIFindHotel2 = useCallback(async () => {
        dispatch(addChatComponent("find-hotel"))
        setMessages((prev) => [
            ...prev,
            { role: "bot", text: "You selected 'Find Hotels'. Let's narrow down your search!" },
        ]);

        try {
            const firstQuestion = await fetchNextQuestion({});
            setMessages((prev) => [...prev, { role: "bot", text: firstQuestion }]);
        } catch (error) {
            console.error("Error fetching AI question:", error);
        }
    }, [dispatch]);

    return { messages, handleUserInput, hotels, isLoading, error, useAIFindHotel2 };
}
