
const hotelsExtraReducer = (builder) => {
    builder
        .addCase(fetchHotels.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchHotels.fulfilled, (state, action) => {
            state.hotels = action.payload;
            state.loading = false;
        })
        .addCase(fetchHotels.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
};

export default hotelsExtraReducer;