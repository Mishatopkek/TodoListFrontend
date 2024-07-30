import {configureStore} from "@reduxjs/toolkit";
import boardSlice from "./boards.js";

const store = configureStore({
    reducer: {board: boardSlice.reducer}
});

export default store;