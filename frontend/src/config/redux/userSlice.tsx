import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "content",
  initialState: {
    user: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    removeUser: (state) => {
      state.user = [];
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
