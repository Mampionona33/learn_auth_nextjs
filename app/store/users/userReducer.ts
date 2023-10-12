import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userActions";

const initialState = {
  liste: null,
  error: null as string | null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.liste = payload;
      state.error = null;
    });
  },
});

export default usersSlice.reducer;
