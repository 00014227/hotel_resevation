import { fetchHotelComparison, fetchHotelDescription, fetchHotels, fetchNearbyAttractions } from "./aiChat.thunk";

const aiChatExtraReducer = (builder) => {
    builder
        .addCase(fetchHotels.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchHotels.fulfilled, (state, action) => {
            state.hotels = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchHotels.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // ✅ Handle fetching hotel descriptions
        .addCase(fetchHotelDescription.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchHotelDescription.fulfilled, (state, action) => {
            state.hotelDetail = action.payload;  // ✅ Save hotel description
            state.isLoading = false;
        })
        .addCase(fetchHotelDescription.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // comparison

        .addCase(fetchHotelComparison.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchHotelComparison.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comparisonResult = action.payload;
        })
        .addCase(fetchHotelComparison.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Failed to fetch hotel comparison";
        })

        // nearby atractions

        .addCase(fetchNearbyAttractions.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchNearbyAttractions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.nearbyAttractions = action.payload;
        })
        .addCase(fetchNearbyAttractions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Failed to fetch hotel comparison";
        });
}

export default aiChatExtraReducer;