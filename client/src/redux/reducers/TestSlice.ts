import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: 1,
  reducers: {
    increment: (state) => {
      return state + 1;
    },
  },
});

export {
    testSlice
}

export const {increment} = testSlice.actions