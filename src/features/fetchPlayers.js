import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const BATTLEMETRICS_API_URL = "https://api.battlemetrics.com";
const serverId = "9933398";


export const fetchPlayers = createAsyncThunk(
    "players/fetchPlayers",
    async () => {
        try {
            const response = await axios.get(`${BATTLEMETRICS_API_URL}/servers/${serverId}`, {
                params: {
                    include: "player"
            }})

            return response.data.included;
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }
);

const initialState = {
    name: 'players',
    isLoading: false,
    isError: false,
    playerList: []
}


const playerSlice = createSlice({
    name: "players",
    initialState,
    extraReducers: (builder) => {
       builder.addCase(fetchPlayers.pending, (state) => {
        state.isLoading = true
       })

       builder.addCase(fetchPlayers.fulfilled, (state, action) => {
        state.isLoading = false
        state.playerList = action.payload
        state.isError = false
       })

       builder.addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false
        state.playerList = []
        state.error = action.error.message
       })
    }

})

export default playerSlice.reducer;

