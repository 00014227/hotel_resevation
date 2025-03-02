import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
import hotelsSlice from "./features/searchHotel/hotels.slice";
import hotelDetailSlice from "./features/hotelDetails/hotelDetails.slice"
import aichatSlice from "./features/AIChat/aichat.slice"

export const rootReducer = combineReducers({
    auth: authSlice,
    hotels: hotelsSlice,
    hotelDetail: hotelDetailSlice,
    aichat: aichatSlice
})