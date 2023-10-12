import { combineReducers } from "redux";
import userLoggedReducer from "./userLogged/userLoggedReducer";
import userListeReducer from "./users/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userLogged: userLoggedReducer,
  userList : userListeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactive la vérification de sérialisation obsolète
    }),
});

export const store = configStore;
export const persistor = persistStore(configStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
