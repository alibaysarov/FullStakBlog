import { createSlice } from "@reduxjs/toolkit";
const uiSlice=createSlice({
  name:'ui',
  initialState:{
    isDrawerOpened:false

  },
  reducers:{
    openDrawerHandler:(state)=>{
      state.isDrawerOpened=!state.isDrawerOpened;
    }
  }
})
export const {openDrawerHandler}=uiSlice.actions;
export default uiSlice.reducer