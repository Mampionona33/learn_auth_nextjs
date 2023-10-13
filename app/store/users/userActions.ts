import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ page = 1, limit = 5 }) => {
    const res = await fetch(`/api/users?page=${page}&limit=${limit}`);
    const data = await res.json();
    console.log("userActions", data);
    return data;
  },
);
