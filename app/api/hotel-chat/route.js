import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const body = await req.json();
        const { userPreferences } = body;

        console.log("Received user preferences:", userPreferences); // Debugging log

        const prompt = `
            You are an AI travel assistant helping a user find the perfect hotel.
            So far, the user has provided these details:
            ${JSON.stringify(userPreferences, null, 2)}
            Based on this, ask the **next most relevant question** to refine the search further.
            Example:
            first always ask location, then budget and emenities, not repete same question.
            - If the user mentioned a city but not budget, ask about budget.
            - If budget is set but no amenities, ask which amenities are important.
            - If all details are provided, suggest hotels.
            Do NOT repeat previous questions. Keep your question short and conversational.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.7,
            max_tokens: 50,
        });

        console.log("OpenAI API Response:", response);

        const nextQuestion = response.choices[0]?.message?.content || "Would you like to refine your search further?";
        return Response.json({ nextQuestion });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return Response.json({ error: "Failed to generate next question" }, { status: 500 });
    }
}
