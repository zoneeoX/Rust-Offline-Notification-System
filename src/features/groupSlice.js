import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "group",
  arrOfGroup: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.arrOfGroup.push(action.payload);
    },
    removeGroup: (state, action) => {
      const idx = action.payload;
      state.arrOfGroup.splice(idx, 1);
    },
  },
});

export const { addGroup, removeGroup } = groupSlice.actions;
export default groupSlice.reducer;
