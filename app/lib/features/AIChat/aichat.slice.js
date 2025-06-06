const { createSlice } = require("@reduxjs/toolkit")
const { default: aiChatExtraReducer } = require("./aichat.extraReducer")

const initialState = {
    messages: [],
    hotels: [],
    hotelDetail: [],
    isLoading: false,
    chatHistory: [],
    error: null,
    msgType: "find-hotel",
    selectedHotelId: null,
    selectedHotels: [], // Store selected hotels for comparison
    comparisonResult: null,
    nearbyAttractions: null,
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
            state.selectedHotelId = action.payload // We may later remove this part 
        },
        addChatComponent: (state, action) => {
            state.chatHistory = [action.payload]; // Replace chat history with a single component
        },
        toggleHotelSelection: (state, action) => {
            const selectedHotel = action.payload;
            const index = state.selectedHotels.findIndex(hotel => hotel.id === selectedHotel.id);

            if (index > -1) {
                // If hotel is already selected, remove it
                state.selectedHotels = state.selectedHotels.filter(hotel => hotel.id !== selectedHotel.id);
            } else {
                // Otherwise, add the full hotel object
                state.selectedHotels.push(selectedHotel);
            }
        },

        clearSelectedHotels: (state) => {
            state.selectedHotels = []
        }
    },
    extraReducers: aiChatExtraReducer,
})

export const { setIsLoading, setHotels, setError,
               setMsgType, setSelectedHotelId, addChatComponent,
               toggleHotelSelection, clearSelectedHotels  } = aichatSlice.actions;
export default aichatSlice.reducer