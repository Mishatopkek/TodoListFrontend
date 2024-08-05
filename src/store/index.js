import {configureStore} from "@reduxjs/toolkit";
import boardSlice from "./boards.js";
import authSlice from "./auth.js";

const store = configureStore({
    reducer: {
        board: boardSlice.reducer,
        auth: authSlice.reducer
    }
});

export default store;