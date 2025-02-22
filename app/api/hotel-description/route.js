import { supabase } from "@/app/lib/supabaseClient";

const { default: OpenAI } = require("openai");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ err: "Method Not Allowed" })
    }

    try {
        const { hotelName, descriptionType = "default" } = req.body

        // fetch hotel from supabase

        const { data: hotels, error } = await supabase
            .from('hotels')
            .select("name, address, price, amenities, description")
            .ilike("name", `%${hotelName}%`)
            .limit(1)

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to fetch hotel details" });
        }

        let prompt;

        if (hotels.length > 0) {
            const hotel = hotels[0];
            prompt = `Generate an engaging description for "${hotel.name}" located at ${hotel.address}. \n\n` +
            `It offers the following amenities: ${hotel.amenities.join(", ")}. ` +
            `The average price per night is $${hotel.price}.\n\n` +
            `Make the description appealing to travelers. If the user requests a specific style ("${descriptionType}"), adjust the tone accordingly.`;
        } else {
            prompt = `Generate a detailed and engaging description for the hotel "${hotelName}". ` +
            `Highlight its potential location, amenities, and what makes it special. If this hotel is well-known, provide historical or interesting facts.`;
        }

        // Call open ai

        const response = await openai.createChatCompletion({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.7,
            max_tokens: 200,
        });

        const description = response.data.choices[0]?.message?.content || "No description available.";

        return res.status(200).json({ description });


    } catch (error) {
        console.error("OpenAI API Error:", error);
        return res.status(500).json({ error: "Failed to generate hotel description" });
    }
}
