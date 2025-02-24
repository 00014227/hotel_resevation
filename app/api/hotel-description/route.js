import { supabase } from "@/app/lib/supabaseClient";

const { default: OpenAI } = require("openai");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export async function POST(req) {
    console.log(req, 'req')
    try {
        const body = await req.json();

        const { hotelName, descriptionType = "default" } = body

        // fetch hotel from supabase

        const { data: hotels, error } = await supabase
            .from('hotels')
            .select("name, address, price, amenities, description")
            .ilike("name", `%${hotelName}%`)
            .limit(1)

        if (error) {
            console.error("Supabase Error:", error);
            return Response.json({ error: "Failed to fetch hotel details" });
        }

        let prompt;

        if (hotels.length > 0) {
            const hotel = hotels[0];
            console.log(hotel, 'hhhh')
            prompt = `Generate an engaging description for "${hotel.name}" located at ${hotel.address}. \n\n` +
            `It offers the following amenities: ${hotel.amenities.join(", ")}. ` +
            `The average price per night is $${hotel.price}.\n\n` +
            `Make the description appealing to travelers. If the user requests a specific style ("${descriptionType}"), adjust the tone accordingly.`;
        } else {
            prompt = `Generate a detailed and engaging description for the hotel "${hotelName}". ` +
            `Highlight its potential location, amenities, and what makes it special. If this hotel is well-known, provide historical or interesting facts.`;
        }

        // Call open ai

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.7,
            max_tokens: 200,
        });
        console.log("OpenAI Response:", response); // ✅ Debugging
        console.log("Message Object:", response.choices[0].message);

        const description = response.choices[0].message?.content || "No description available.";

        return Response.json({ description });


    } catch (error) {
        console.error("OpenAI API Error:", error);
        return Response.json({ error: "Failed to generate hotel description" });
    }
}
