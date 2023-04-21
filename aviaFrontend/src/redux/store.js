import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import postReducer from './slices/postSlice';
import adminPanelSlice from './slices/adminPanelSlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/user';
export default configureStore({
  reducer:{
    ui:uiReducer,
    posts:postReducer,
    adminPanel:adminPanelSlice,
    auth:authSlice,
    user:userSlice
  }
})