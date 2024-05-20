// persistConfig.js
import { persistReducer,persistStore } from 'redux-persist';
import userReducer from "./userSlice"
import storage from 'redux-persist/lib/storage'; 
import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})

export const persistor = persistStore(store)
export default persistConfig;
