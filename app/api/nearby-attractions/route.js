const { default: OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
    try {
        const body = await req.json();
        const { hotelName, location } = body;
        console.log("Received Data:", { hotelName, location });

        // Ensure valid hotel data before making the API call
        if (!hotelName || !location) {
            console.error("Missing hotel name or location");
            return new Response(JSON.stringify({ error: "Missing hotel name or address" }), { status: 400 });
        }

        // Call OpenAI to generate nearby attractions
        const openAiResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a travel assistant. Given a hotel name and location, list 5 nearby attractions with a short description.`,
                },
                {
                    role: "user",
                    content: `List 5 attractions near ${hotelName}, located at ${location}.`,
                },
            ],
            max_tokens: 300,
        });

        // Log full OpenAI response for debugging
        console.log("OpenAI Response:", JSON.stringify(openAiResponse, null, 2));

        // Extract the AI response
        const attractions = openAiResponse.choices?.[0]?.message?.content || "No attractions found.";

        return new Response(JSON.stringify({ attractions }), { status: 200 });
    } catch (error) {
        console.error("Error fetching nearby attractions:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch attractions" }), { status: 500 });
    }
}
