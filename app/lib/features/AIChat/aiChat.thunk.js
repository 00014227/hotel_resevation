import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient";

export const fetchHotels = createAsyncThunk(
    'aichat/fetchHotels',
    async (userPreferences) => {
        console.log(userPreferences, 'preffff')
        const { data, error } = await supabase
            .from("hotels")
            .select("id, name, address, price, amenities, image_url")
            .ilike("address->>region", `%${userPreferences.location}%`)
            .lte("price", Number(userPreferences.budget))
            .contains("amenities", userPreferences.amenities);

        if (error) {
            toast.error("Sorry, something went wrong fetching hotels.")
            return error
        }
        console.log(data, 'ddddddd')
        return data
    }
)

export const fetchHotelDescription = createAsyncThunk(
    'aichat/fetchHotelDescription',
    async (hotelName, descriptionType = "default") => {
        try {
            const response = await fetch("/api/hotel-description", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hotelName, descriptionType })
            })
            const data = await response.json(); 
            return data
        } catch (error) {
            console.error("Error fetching hotel description:", error);
            toast.error('Failed to generate a description.')
        }
    }
)
