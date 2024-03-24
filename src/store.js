import { configureStore } from "@reduxjs/toolkit"
import playerReducer from "./features/fetchPlayers"
import groupReducer from "./features/groupSlice"

export const store = configureStore({
    reducer: {
        players: playerReducer,
        group: groupReducer,
    }
})