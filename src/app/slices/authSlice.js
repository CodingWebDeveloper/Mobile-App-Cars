import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newUser = action.payload;
      state.user = newUser;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
