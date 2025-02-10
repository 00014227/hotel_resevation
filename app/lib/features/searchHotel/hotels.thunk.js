import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const searchHotels = createAsyncThunk(

    'hotels/fetchHotels',
    async ({ country, city, checkIn, checkOut, includePets, totalGuests }) => {
        try {
            // Fetch unavailable room IDs by calling the PostgreSQL function
            const { data: unavailableRooms, error: unavailableRoomsError } = await supabase
                .rpc('get_unavailable_rooms', { check_in: checkIn, check_out: checkOut });

            if (unavailableRoomsError) {
                console.error('Error fetching unavailable rooms:', unavailableRoomsError);
                return [];
            }

            // Extract room IDs from the result
            const unavailableRoomIds = unavailableRooms.map(room => room.room_id);
            let query = supabase
                .from('hotels')
                .select(`
        id, name, location, address, price, amenities, rating, description, image_url,
        rooms!inner(id, max_guests, bedrooms, beds, pets_allowed)
    `);

            // Apply country and city filters
            if (country) {
                query = query.ilike('address->>country', `%${country}%`);
            }

            if (city) {
                query = query.ilike('address->>region', `%${city}%`);
            }

            // Join with rooms table and apply guest and pets filters
            query = query
                .gte('rooms.max_guests', totalGuests)
                .eq('rooms.pets_allowed', includePets);

            // Exclude unavailable rooms if there are any
            if (unavailableRoomIds.length > 0) {
                query = query.not('rooms.id', 'in', unavailableRoomIds);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching hotels:', error);
                return [];
            }
            return { data, error };
        } catch (error) {
            console.log('Error with search:', error)
        }
    }
)

