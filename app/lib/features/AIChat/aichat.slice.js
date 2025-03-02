const { createSlice } = require("@reduxjs/toolkit")
const { default: aiChatExtraReducer } = require("./aichat.extraReducer")

const initialState = {
    messages: [],
    hotels: [],
    hotelDetail: [],
    isLoading: false, 
    error: null, 
    msgType: "find-hotel",
    selectedHotelId: null,

}

const aichatSlice = createSlice({
    name: 'aichat',
    initialState,
    reducers: {
        clearHotes: (state) => {
            state.hotels = []
        },
        setMsgType: (state, action) => {
            state.msgType = action.payload;
        },
        setSelectedHotelId: (state, action) => {
            state.selectedHotelId = action.payload
        }
    },
    extraReducers: aiChatExtraReducer,
})

export const {setIsLoading, setHotels, setError, setMsgType, setSelectedHotelId} = aichatSlice.actions;
export default aichatSlice.reducer