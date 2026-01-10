// addressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
  },
  reducers: {
    setAddress(state, action) {
      state.list = [action.payload];
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
