import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoginUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setLoginUsername } = userSlice.actions;

export const selectUsername = (state) => state.users.username;

export default userSlice.reducer;
