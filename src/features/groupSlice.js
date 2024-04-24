import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "group",
  arrOfGroup: localStorage.getItem('listOfGroups') ? JSON.parse(localStorage.getItem('listOfGroups')) : []
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
      localStorage.setItem("listOfGroups", JSON.stringify(state.arrOfGroup))
    },
  },
});

export const { addGroup, removeGroup } = groupSlice.actions;
export default groupSlice.reducer;
