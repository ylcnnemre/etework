import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: true,
  reducers: {
    login: (state) => {
      state = true;
    },
  },
});


export {
  authSlice
}
export const {login} = authSlice.actions