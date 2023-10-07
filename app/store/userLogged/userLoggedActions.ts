import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserLogged = createAsyncThunk(
  "userLogged/fetch",
  async (idUser: string) => {
    const res = await fetch(`/api/users/${idUser}`);
    const data = await res.json();
    return data;
  }
);
