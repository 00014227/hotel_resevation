import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const fetchHotelById = createAsyncThunk(
    'hotelDetail/fetchHotelById',

    async ( id ) => {
        console.log(id, 'iddd')
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
    async ({ checkIn, checkOut, id }, { rejectWithValue }) => {
        console.log(id, 'hjjjj')
        
        // Step 1: Fetch unavailable room IDs for the given date range
        const { data: unavailableRooms, error: unavailableRoomsError } = await supabase
            .rpc('get_unavailable_rooms', { check_in: checkIn, check_out: checkOut });

        if (unavailableRoomsError) {
            console.error('Error fetching unavailable rooms:', unavailableRoomsError);
            return rejectWithValue('Failed to fetch unavailable rooms');
        }

        // Extract unavailable room IDs
        const unavailableRoomIds = unavailableRooms.map(room => room.room_id);

        // Step 2: Fetch rooms with amenities and categories for the specified hotel, excluding unavailable rooms
        let query = supabase
            .rpc('get_rooms_with_amenities_and_categories', { input_hotel_id: id });

        // Exclude unavailable rooms from the query
        if (unavailableRoomIds.length > 0) {
            query = query.filter('room_id', 'not.in', unavailableRoomIds);
        }

        const { data: roomsWithAmenities, error: roomsWithAmenitiesError } = await query;
    
        if (roomsWithAmenitiesError) {
            console.error('Error fetching rooms with amenities:', roomsWithAmenitiesError);
            return rejectWithValue('Failed to fetch rooms with amenities');
        }
    
        return roomsWithAmenities;
    }
)
