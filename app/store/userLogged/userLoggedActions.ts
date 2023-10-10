import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserLogged = createAsyncThunk(
  "userLogged/fetch",
  async (idUser: string) => {
    const res = await fetch(`/api/users/${idUser}`);
    const data = await res.json();
    return data;
  }
);

export const getUserLoggedGroupe = createAsyncThunk(
  "userLogged/getGroupe",
  async (idgroupe:string) => {
    const res = await fetch(`/api/groupe/${idgroupe}`);
    const data = await res.json();
    // console.log(data)
    return data;
  }
)
