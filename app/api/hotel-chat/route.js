import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(req) {
    try {
      const {message, step} = await req.json();

      let systemMessage = "Ты помощник, который рекомендует отели.";
      let useMessages = [{role: 'user', content: message}]

      if (!message) {
        return NextResponse.json({
          reply: "Привет! Я помогу вам найти отель. В каком городе вы ищете отель?",
          step: "location",
        })
      }

      let botReply = "";
      let nextStep = "";

      switch (step) {
        case value:
          
          break;
      
        default:
          break;
      }

    } catch (error) {
      
    }
}