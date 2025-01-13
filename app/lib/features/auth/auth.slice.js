import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAuthState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setLoading, setUser, setError, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
