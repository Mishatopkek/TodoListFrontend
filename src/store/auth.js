import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const notAuthCredentials = {
    isAuthenticated: false,
    user: null,
    token: null
};

export const checkToken = createAsyncThunk('auth/checkToken', async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (isTokenExpired) {
            localStorage.removeItem('token');
            return null;
        }
        return token;
    }
    return null;
});

const authSlice = createSlice({
    name: "auth",
    initialState: notAuthCredentials,
    reducers: {
        loginSuccess(state, action) {
            const token = action.payload;
            return {
                isAuthenticated: true,
                user: jwtDecode(token),
                token: token
            }
        },
        logout(state, action) {
            localStorage.removeItem("token")
            return notAuthCredentials;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.user = jwtDecode(action.payload);
                state.token = action.payload;
            }
        })
    }
})

export const authActions = authSlice.actions;

export default authSlice;