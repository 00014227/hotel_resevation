import { fetchFollowUpQuestion, fetchHotels } from "./findHotelAI.thunk";

const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    messages: [{ role: "bot", text: "Hello! How can I assist you today?" }],
    userPreferences: {},
    hotels: [],
    loading: false,
    error: null,
}

const aiChatSlice = createSlice({
    name: "aiChat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        updateUserPreferences: (state, action) => {
            state.userPreferences = { ...state.userPreferences, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowUpQuestion.fulfilled, (state, action) => {
                state.messages.push({ role: "bot", text: action.payload });
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.hotels = action.payload;
                state.messages.push({ role: "bot", text: "Here are some hotels based on your preferences!" });
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.messages.push({ role: "bot", text: `Error: ${action.payload}` });
                state.loading = false;
            })
            
    },
})

export const { addMessage, updateUserPreferences } = aiChatSlice.actions;
export default aiChatSlice.reducer; 