import columnSlice from "./columns.js";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {column: columnSlice.reducer}
});

export default store;