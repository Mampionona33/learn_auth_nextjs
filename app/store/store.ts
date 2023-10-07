import { combineReducers } from "redux";
import userLoggedReducer from "./userLogged/userLoggedReducer";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  userLogged: userLoggedReducer, 
});


export const store = configureStore({
    reducer:rootReducer,
    middleware:[thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
