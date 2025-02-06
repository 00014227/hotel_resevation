import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const fetchHotelById = createAsyncThunk(
    'hotelDetail/fetchHotelById',

    async ({ id }) => {
        try {
            const { data, error } = await supabase
                .from('hotels')
                .select('*')
                .eq('id', id)
            return { data, error }

        } catch (error) {
            console.log(error)
        }

    }
)

export const fetchActiveHotelRooms = createAsyncThunk(
    'hotelDetail/fetchActiveHotelRooms',
    async ({ checkIn, checkOut, hotelId }, { rejectWithValue }) => {
              // Step 1: Fetch unavailable room IDs for the given date range
              const { data: unavailableRooms, error: unavailableRoomsError } = await supabase
              .rpc('get_unavailable_rooms', { check_in: checkIn, check_out: checkOut });

          if (unavailableRoomsError) {
              console.error('Error fetching unavailable rooms:', unavailableRoomsError);
              return rejectWithValue('Failed to fetch unavailable rooms');
          }

          // Extract unavailable room IDs
          const unavailableRoomIds = unavailableRooms.map(room => room.room_id);

          // Step 2: Fetch all rooms for the specified hotel, excluding unavailable rooms
          let query = supabase
              .from('rooms')
              .select('*')
              .eq('hotel_id', hotelId);

          if (unavailableRoomIds.length > 0) {
              query = query.not('room_id', 'in', `(${unavailableRoomIds.join(',')})`);
          }

          const { data: availableRooms, error: availableRoomsError } = await query;

          if (availableRoomsError) {
              console.error('Error fetching available rooms:', availableRoomsError);
              return rejectWithValue('Failed to fetch available rooms');
          }

          // Return the list of available rooms
          return availableRooms;
    }
)