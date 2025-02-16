import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message, step, location, budget, amenities } = await req.json();

    let botReply = "";
    let nextStep = "";
    let hotels = [];
    const numericBudget = Number(budget);
    const amenitiesArray  = Array.isArray(amenities) ? amenities : [amenities]
    if (!message) {
      return NextResponse.json({
        reply: "Hello! I will help you find a hotel. In which city are you looking for a hotel?",
        step: "location",
      });
    }

    switch (step) {
      case "location":
        botReply = "Great! What is your budget per night in USD?";
        nextStep = "budget";
        break;
      case "budget":
        botReply = "Got it! What amenities are important to you? (e.g., pool, Wi-Fi, parking)";
        nextStep = "amenities";
        break;
      case "amenities":
        botReply = "Thanks! Now I'll find some hotels based on your preferences...";
        const orConditions = amenitiesArray.map((a) => `amenities.ilike.%${a.toLowerCase()}%`).join(",");

        const { data, error } = await supabase
        .from("hotels")
        .select("id, name, address, price, amenities, image_url")
        .ilike("LOWER(address->>region)", `%${location.toLowerCase()}%`) // Case-insensitive location match
        .lte("price", numericBudget) // Filter by budget
        .contains('amenities', amenitiesArray)

        if (error) {
          console.error("Supabase Error:", error);
          return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
        }

        hotels = data || [];
        botReply = hotels.length ? "Here are some hotels for you:" : "Sorry, no hotels match your criteria.";
        nextStep = "done";
        break;

      default:
        botReply = "Let me know if you need further assistance!";
        nextStep = "done";
    }

    return NextResponse.json({ reply: botReply, step: nextStep, hotels });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
