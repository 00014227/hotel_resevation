const { createSlice } = require("@reduxjs/toolkit")
const { default: hotelDetailExtraReducer } = require("./hotelDetail.extraReducer")

const initialState = {
    hotel: null,
    rooms: null,
    isLoading: false,
    error: null
}

const hotelDetailSlice = createSlice({
    name: 'hotelDetail',
    initialState, 
    reducers: {},
    extraReducers: hotelDetailExtraReducer,
})

export const {setIsLoading, setHotelDetail, setError} = hotelDetailSlice.actions

export default hotelDetailSlice.reducer