import hotelsExtraReducer from "./hotels.extraReducer";

const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    hotels: null,
    isLoading: false,
    error: null
}


const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {},
    extraReducers: hotelsExtraReducer,
})

export const {setIsLoading, setHotels, setError} = hotelsSlice.actions;

export default hotelsSlice.reducer