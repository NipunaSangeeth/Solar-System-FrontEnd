// collection of state values. import { createSlice } from '@reduxjs/toolkit'
// so this reducers help to triger the Values anyware in the sustem,
// Eg-: if we click button related to the SwithchHomeTab action it can triger the different Payloads related to it.  

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedHomeTab: "all",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchHomeTab: (state, action) => {
      console.log(action);
      state.selectedHomeTab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchHomeTab } = uiSlice.actions;

export default uiSlice.reducer;
