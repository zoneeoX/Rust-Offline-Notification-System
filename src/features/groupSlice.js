import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: 'group',
    arrOfGroup : [],
}

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        addGroup: (state,action) => {
            state.arrOfGroup.push(action.payload)
        }
    }
})

export const { addGroup } = groupSlice.actions;
export default groupSlice.reducer;