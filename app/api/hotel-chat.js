import { supabase } from "@/app/lib/supabaseClient";
import OpenAI from "openai";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Метод не поддерживается" });
    }
  
    const { messages } = req.body;
  
    try {
      // Шаг 1: Запрашиваем у OpenAI уточняющие вопросы, если данных недостаточно
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Ты ассистент по подбору отелей. Уточняй детали перед рекомендацией." },
          ...messages,
        ],
      });
  
      const reply = chatResponse.choices[0].message.content;
  
      // Шаг 2: Если уже есть достаточная информация, ищем отели
      if (reply.includes("Ваши предпочтения сохранены")) {
        const { data: hotels, error } = await supabase
          .from("hotels")
          .select("*")
          .limit(3); // Фильтруем по предпочтениям (добавим позже)
  
        if (error) throw error;
  
        const hotelList = hotels.map(hotel => `🏨 *${hotel.name}* - ${hotel.price}$, ${hotel.stars}⭐`).join("\n");
  
        return res.status(200).json({ reply: `Вот мои рекомендации:\n\n${hotelList}` });
      }
  
      // Шаг 3: Если информации мало, продолжаем диалог
      res.status(200).json({ reply });
    } catch (error) {
      console.error("Ошибка OpenAI:", error);
      res.status(500).json({ error: "Ошибка генерации ответа" });
    }
  }