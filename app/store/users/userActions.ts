import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await fetch(`/api/users?page=1&limit=5`);
  const data = await res.json();
  console.log("userActions", data);
  return data;
});
