import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export function useAIFindHotel() {
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello! How can I assist you today?" },
    ]);
    const [hotels, setHotels] = useState([]);
    const [userPreferences, setUserPreferences] = useState({});
    const [isProcessing, setIsProcessing] = useState(false); // Prevent duplicate questions

    async function handleUserInput(input) {
        setIsProcessing(true);

        setUserPreferences((prev) => {
            const updatedPreferences = { ...prev };

            if (!prev.location) updatedPreferences.location = input;
            else if (!prev.budget) updatedPreferences.budget = input;
            else if (!prev.amenities) updatedPreferences.amenities = input.split(",");

            return updatedPreferences;
        });

        setMessages((prev) => [...prev, { role: "user", text: input }]);
    }

    useEffect(() => {
        if (!isProcessing) return;

        async function processNextQuestion() {
            const nextQuestion = await fetchNextQuestion(userPreferences);
            setMessages((prev) => [...prev, { role: "bot", text: nextQuestion }]);
            setIsProcessing(false);
        }

        processNextQuestion();

        if (userPreferences.location && userPreferences.budget && userPreferences.amenities) {
            fetchHotels();
        }
    }, [userPreferences]);

    async function fetchHotels() {
        const { data, error } = await supabase
            .from("hotels")
            .select("id, name, address, price, amenities, image_url")
            .ilike("address->>region", `%${userPreferences.location}%`)
            .lte("price", Number(userPreferences.budget))
            .contains("amenities", userPreferences.amenities);

        if (error) {
            setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong fetching hotels." }]);
            return;
        }

        setHotels(data);
        setMessages((prev) => [...prev, { role: "bot", text: "Here are some hotels based on your preferences!" }]);
    }

    async function fetchNextQuestion(updatedPreferences) {
        try {
            console.log("Fetching next question with:", updatedPreferences);

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
            return "Would you like to refine your search further?";
        }
    }

    const useAIFindHotel2 = useCallback(async () => {
        setMessages((prev) => [
            ...prev,
            { role: "bot", text: "You selected 'Find Hotels'. Let's narrow down your search!" },
        ]);

        await new Promise((resolve) => setTimeout(resolve, 0));

        try {
            const firstQuestion = await fetchNextQuestion({});
            setMessages((prev) => [...prev, { role: "bot", text: firstQuestion }]);
        } catch (error) {
            console.error("Error fetching AI question:", error);
        }
    }, []);

    return { messages, handleUserInput, hotels, useAIFindHotel2 };
}
