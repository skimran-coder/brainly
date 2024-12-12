import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: [],
  },
  reducers: {
    addContent: (state, action) => {
      state.content.push(action.payload);
    },
  },
});

export const { addContent } = contentSlice.actions;
export default contentSlice.reducer;
