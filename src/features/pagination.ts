import { createSlice } from "@reduxjs/toolkit";

export const pagingSlice = createSlice({
  name: "pagination",
  initialState: { page: 1, limit: 5 },
  reducers: {
    nextPage(state) {
      state.page += 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export default pagingSlice.reducer;
