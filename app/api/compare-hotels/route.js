import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
    try {
        const body = await req.json();
        const { selectedHotels } = body;
        console.log(selectedHotels, "selllecttt")

        if (!selectedHotels || selectedHotels.length < 2) {
            console.error("🚨 Error: At least two hotels are required for comparison.");
            return new Response(JSON.stringify({ error: "At least two hotels are required for comparison." }), { status: 400 });
        }

        const prompt = `Compare these hotels based on location, price, and amenities:\n\n${selectedHotels
            .map((hotel, index) => `${index + 1}. ${hotel.name}, Location: ${hotel.location}, Price: ${hotel.price}`)
            .join("\n")}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an expert travel assistant." },
                { role: "user", content: prompt }
            ],
        });

        const comparison = response.choices[0].message.content;

        // 🖥️ Log the comparison result to the server console
        console.log("📝 AI Hotel Comparison Result:\n", comparison);

        return new Response(JSON.stringify({ comparison }), { status: 200 });

    } catch (error) {
        console.error("🚨 API Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
}
