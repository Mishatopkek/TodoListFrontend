import {createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const notAuthCredentials = {
    isAuthenticated: false,
    user: null,
    token: null
};


const authSlice = createSlice({
    name: "auth",
    initialState: notAuthCredentials,
    reducers: {
        initialize(state, action) {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const isTokenExpired = decodedToken.exp * 1000 < Date.now();

                if (isTokenExpired) {
                    localStorage.removeItem('token');
                } else {
                    state.isAuthenticated = true;
                    state.user = decodedToken;
                    state.token = token;
                    return;
                }
            }

            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        loginSuccess(state, action) {
            const token = action.payload;
            localStorage.setItem("token", token);
            state.isAuthenticated = true;
            state.user = jwtDecode(token);
            state.token = token;
        },
        logout(state, action) {
            localStorage.removeItem("token");
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice;