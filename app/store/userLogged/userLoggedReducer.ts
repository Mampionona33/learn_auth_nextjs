import { createSlice } from "@reduxjs/toolkit";
import { getUserLogged } from "./userLoggedActions";

const initialState = {
  userLogged: null,
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserLogged.fulfilled, (state, { payload }) => {
      state.userLogged = payload.user;
    });
  },
});

export default userLoggedSlice.reducer;
