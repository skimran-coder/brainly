import { createSlice } from "@reduxjs/toolkit";

export interface Content {
  _id: string;
  title: string;
  description?: string;
  link: string;
  type: string;
  userId: {
    username: string;
    email: string;
  };
  tags: string[];
  createdAt: string;
}

interface ContentState {
  content: Content[];
}

const initialState: ContentState = {
  content: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
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
    emptyContent: (state) => {
      state.content = [];
    },
  },
});

export const {
  setContentState,
  addContent,
  removeContent,
  updateContent,
  emptyContent,
} = contentSlice.actions;
export default contentSlice.reducer;
