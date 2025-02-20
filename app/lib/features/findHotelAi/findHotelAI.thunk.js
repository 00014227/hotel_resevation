import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

// Thunk to fetch follow-up questions from API
export const fetchFollowUpQuestion = createAsyncThunk(
    "aiChat/fetchFollowUpQuestion",
    async (userPreferences) => {
        // need to chande route
      const response = await fetch("/api/hotel-chat", { 
        method: "POST",
        body: JSON.stringify(userPreferences),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data.question;
    }
  );


// Thunk to fetch hotels from Supabase
export const fetchHotels = createAsyncThunk(
    "aiChat/fetchHotels",
    async (preferences) => {
      const { data, error } = await supabase
        .from("hotels")
        .select("id, name, address, price, amenities, image_url")
        .ilike("address->>region", `%${preferences.location}%`)
        .lte("price", Number(preferences.budget))
        .contains("amenities", preferences.amenities);
  
      if (error) throw new Error(error.message);
      return data;
    }
  );

