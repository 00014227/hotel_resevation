const { fetchHotelById, fetchActiveHotelRooms } = require("./hotelDetails.thunk")

const hotelDetailExtraReducer = (builder) => {
    builder
        .addCase(fetchHotelById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchHotelById.fulfilled, (state, action) => {
            state.hotel = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchHotelById.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchActiveHotelRooms.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchActiveHotelRooms.fulfilled, (state, action) => {
            state.room = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchActiveHotelRooms.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
}

export default hotelDetailExtraReducer;