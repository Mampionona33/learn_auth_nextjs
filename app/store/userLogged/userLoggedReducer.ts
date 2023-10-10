import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserLogged, getUserLoggedGroupe } from "./userLoggedActions";

const initialState = {
  generalInfo: null,
  error: null as string | null,
  groupe : null
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogged.fulfilled, (state, { payload }) => {
        state.generalInfo = payload.user;
        state.error = null; 
      })
      .addCase(getUserLogged.pending, (state) => {
        state.generalInfo = null; 
        state.error = null; 
      })
      .addCase(getUserLogged.rejected, (state, { error }) => {
        state.generalInfo = null; 
        state.error = error.message; 
      });
      builder.addCase(getUserLoggedGroupe.fulfilled,(state,{payload})=>{
        state.groupe = payload.groupe;
        state.error= null
      })
  },
});


export default userLoggedSlice.reducer;
