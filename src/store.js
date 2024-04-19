import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/fetchPlayers";
import groupReducer from "./features/groupSlice";
import serverSlice from "./features/searchServer";

export const store = configureStore({
  reducer: {
    players: playerReducer,
    group: groupReducer,
    server: serverSlice,
  },
});
