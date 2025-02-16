import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { message, step } = await req.json();

    let systemMessage = "Ты помощник, который рекомендует отели.";
    let userMessages = [{ role: "user", content: message }];

    if (!message) {
      // First message: Greeting and first question
      return NextResponse.json({
        reply: "Привет! Я помогу вам найти отель. В каком городе вы ищете отель?",
        step: "location",
      });
    }

    let botReply = "";
    let nextStep = "";

    switch (step) {
      case "location":
        botReply = `Отлично! Какой у вас бюджет за ночь? (в долларах)`;
        nextStep = "budget";
        break;
      case "budget":
        botReply = `Понял! Какие удобства для вас важны? (например, бассейн, Wi-Fi, парковка)`;
        nextStep = "amenities";
        break;
      case "amenities":
        botReply = `Спасибо! Теперь я подберу вам отель на основе ваших предпочтений...`;
        nextStep = "searching";
        break;
      default:
        const chatResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemMessage }, ...userMessages],
        });
        botReply = chatResponse.choices[0].message.content;
        nextStep = "done";
    }

    return NextResponse.json({ reply: botReply, step: nextStep });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
