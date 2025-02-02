import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
import hotelsSlice from "./features/searchHotel/hotels.slice";

export const rootReducer = combineReducers({
    auth: authSlice,
    hotels: hotelsSlice,
})