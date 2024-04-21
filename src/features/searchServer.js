import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BATTLEMETRICS_API_URL = "https://api.battlemetrics.com";

const initialState = {
  name: "server",
  serverId: "",
  isLoading: false,
  isError: false,
  serverList: [],
};


export const fetchServer = createAsyncThunk("server/fetchServer", async (keyword) => {
  try {
    const response = await axios.get(`${BATTLEMETRICS_API_URL}/servers`, {
      params: {
        "filter[game]": "rust",
        "sort" : "rank",
        "page[size]" : 10,
        "filter[status]": "online",
        "filter[search]" : keyword//search
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
});

const serverSlice = createSlice({
  name: "server",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchServer.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchServer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.serverList = action.payload;
      state.isError = false;
    });

    builder.addCase(fetchServer.rejected, (state, action) => {
      state.loading = false;
      state.playerList = [];
      state.error = action.error.message;
    });
  },
});

export default serverSlice.reducer;
