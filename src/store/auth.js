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
        loginSuccess(state, action) {
            const token = action.payload;
            return {
                isAuthenticated: true,
                user: jwtDecode(token),
                token: token
            }
        },
        logout(state, action) {
            return notAuthCredentials;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;