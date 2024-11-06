import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_INITIAL_STATE = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: DEFAULT_INITIAL_STATE,
  reducers: {
    setSearchTerm: (state, action) => {
      const newSearchTerm = action.payload;
      state.searchTerm = newSearchTerm;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
export const selectSearchTerm = (state) => state.search.searchTerm;
