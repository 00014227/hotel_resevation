import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { hotels } = req.body;
    if (!hotels || hotels.length < 2) {
        return res.status(400).json({ error: "At least two hotels are required for comparison." });
    }

    const prompt = `Compare these hotels based on location, price, amenities, and guest reviews:\n\n${hotels
        .map((hotel, index) => `${index + 1}. ${hotel}`)
        .join("\n")}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: "You are an expert travel assistant." }, { role: "user", content: prompt }],
        });

        const comparison = response.choices[0].message.content;
        return res.status(200).json(comparison);
    } catch (error) {
        console.error("OpenAI Error:", error);
        return res.status(500).json({ error: "Failed to generate a comparison." });
    }
}
