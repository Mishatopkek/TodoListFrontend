import {createAsyncThunk} from "@reduxjs/toolkit";

export const boardInitializeThunk = createAsyncThunk("api/Board/GetById", async ({boardName}, {getState}) => {
    const state = getState();
    const jwtToken = state.auth.token;
});
