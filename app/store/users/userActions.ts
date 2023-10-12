import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await fetch(`/api/users`);
  const data = await res.json();
  console.log(data);
  return data;
});
