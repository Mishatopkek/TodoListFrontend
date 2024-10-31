// import {createAsyncThunk} from "@reduxjs/toolkit";
// import config from "../../config.js";
//
// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async (payload, thunkAPI) => {
//     const response = await fetch(`${config.backendUrl}/api/User/Login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//     const data = await response.json();
//     if (response.status === 200) {
//       return data;
//     } else {
//       return thunkAPI.rejectWithValue(data);
//     }
//   }
// );