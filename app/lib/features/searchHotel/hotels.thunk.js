import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const searchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async ({ city, checkIn, checkOut, includePets, totalGuests }) => {
    try {
      // Step 1: Get available room IDs
      const { data: availableRooms, error: availableRoomsError } = await supabase
        .rpc('get_available_rooms', { check_in: checkIn, check_out: checkOut });

      if (availableRoomsError) {
        console.error('Error fetching available rooms:', availableRoomsError);
        return { data: [], error: availableRoomsError };
      }

      const availableRoomIds = availableRooms.map(r => r.room_id);

      if (availableRoomIds.length === 0) {
        // No rooms available at all
        return { data: [], error: null };
      }

      // Step 2: Fetch available rooms with hotel data
      let roomQuery = supabase
        .from('rooms')
        .select(`
          id, hotel_id, max_guests, bedrooms, beds, pets_allowed,
          hotel:hotels(id, name, location, address, price, amenities, rating, description, image_url)
        `)
        .in('id', availableRoomIds);

      if (totalGuests) {
        roomQuery = roomQuery.gte('max_guests', totalGuests);
      }

      if (includePets !== undefined) {
        roomQuery = roomQuery.eq('pets_allowed', includePets);
      }

      const { data: rooms, error: roomsError } = await roomQuery;

      if (roomsError) {
        console.error('Error fetching rooms:', roomsError);
        return { data: [], error: roomsError };
      }

      // Step 3: Group rooms by hotel
      const hotelMap = {};
      rooms.forEach(room => {
        const hotel = room.hotel;
        if (!hotelMap[hotel.id]) {
          hotelMap[hotel.id] = { ...hotel, rooms: [] };
        }
        hotelMap[hotel.id].rooms.push({
          id: room.id,
          max_guests: room.max_guests,
          bedrooms: room.bedrooms,
          beds: room.beds,
          pets_allowed: room.pets_allowed
        });
      });

      // Step 4: Optional filter by city
      let filteredHotels = Object.values(hotelMap);
      if (city) {
        filteredHotels = filteredHotels.filter(hotel =>
          hotel.address?.region?.toLowerCase().includes(city.toLowerCase())
        );
      }

      return { data: filteredHotels, error: null };

    } catch (error) {
      console.error('Error with search:', error);
      return { data: [], error };
    }
  }
);
