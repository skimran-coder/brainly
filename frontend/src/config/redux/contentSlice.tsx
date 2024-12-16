import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: [],
  },
  reducers: {
    setContentState: (state, action) => {
      state.content = action.payload;
    },
    addContent: (state, action) => {
      state.content = [...state.content, action.payload];
    },
    removeContent: (state, action) => {
      console.log(state.content);
      state.content = state.content.filter(
        (card) => card._id != action.payload
      );
    },
    updateContent: (state, action) => {
      state.content = state.content.map((card) =>
        card._id === action.payload._id ? action.payload : card
      );
    },
  },
});

export const { setContentState, addContent, removeContent, updateContent } =
  contentSlice.actions;
export default contentSlice.reducer;
