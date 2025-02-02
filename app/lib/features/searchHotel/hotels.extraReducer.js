import { searchHotels } from "./hotels.thunk";

const hotelsExtraReducer = (builder) => {
    builder
        .addCase(searchHotels.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(searchHotels.fulfilled, (state, action) => {
            state.hotels = action.payload;
            state.isLoading = false;
        })
        .addCase(searchHotels.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
};

export default hotelsExtraReducer;