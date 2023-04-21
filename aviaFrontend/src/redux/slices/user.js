import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios'

export const getUser=createAsyncThunk('user/getUser',async(id,{rejectWithValue})=>{
    try {
        const {status,data}= await axios.get('/profile/'+id);
        if (status>=200&& status<=399) {
            return data
        } else {
            return rejectWithValue({err:'Ошибка при получении пользователя'})
        }
    } catch (err) {
        throw new Error(err)
        return rejectWithValue({message:err.message})
    }
})
const user=createSlice({
    name:'user',
    initialState:{
        profileInfo:{},
        status:'loading'
    },
    extraReducers:{
        [getUser.pending]:(state,action)=>{
            state.status='loading'
        },
        [getUser.fulfilled]:(state,action)=>{
            state.status='loaded'
            state.profileInfo=action.payload;
        },
        [getUser.rejected]:(state,action)=>{
            state.status='err'
        },
    }
})
export default user.reducer