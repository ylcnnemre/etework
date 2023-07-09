import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    login: () => {
      return true
    },
    logout: () => {
      return false
    },
  },
});

export { authSlice };
export const { login , logout } = authSlice.actions;
