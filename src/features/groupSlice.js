import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "group",
  arrOfGroup: localStorage.getItem("listOfGroups")
    ? JSON.parse(localStorage.getItem("listOfGroups"))
    : [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.arrOfGroup.push(action.payload);
      localStorage.setItem("listOfGroups", JSON.stringify(state.arrOfGroup));
    },
    removeGroup: (state, action) => {
      const idx = action.payload;
      state.arrOfGroup.splice(idx, 1);
      localStorage.setItem("listOfGroups", JSON.stringify(state.arrOfGroup));
    },
    addPlayer: (state, action) => {
      const { selectPlayers, idx } = action.payload;
      state.arrOfGroup[idx].selectPlayers =
        state.arrOfGroup[idx].selectPlayers.concat(selectPlayers);

      localStorage.setItem("listOfGroups", JSON.stringify(state.arrOfGroup));
    },
    removePlayer: (state, action) => {
      const { playerIDX, groupIDX } = action.payload;
      state.arrOfGroup[groupIDX].selectPlayers.splice(playerIDX, 1);
      localStorage.setItem("listOfGroups", JSON.stringify(state.arrOfGroup));
    },
  },
});

export const { addGroup, removeGroup, addPlayer, removePlayer } =
  groupSlice.actions;
export default groupSlice.reducer;
