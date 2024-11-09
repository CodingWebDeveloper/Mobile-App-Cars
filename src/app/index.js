import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
  },
});
