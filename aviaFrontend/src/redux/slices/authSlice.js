import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios';


export const getSubs=createAsyncThunk('auth/getSubs',async(_,{rejectWithValue})=>{
    try {
        const token=window.localStorage.getItem('aviaBlogToken');
        if (!token=='') {
            const cfg={
                headers:{
                    'Authorization':`Bearer: ${token}`,
                    'Content-Type':'application/json'
                }
            }
            const res=await axios.get('/user/subs',cfg)
            if (res.status>=200 && res.status<=399) {
                console.log(res.data);
                return res.data.subsribtions;
            } else {
                return rejectWithValue({err:'Ошибка'})
            }
        } else {
            return rejectWithValue({err:'Вы не авторизованы!'})
        }
    } catch (err) {
        return rejectWithValue({err:'Ошибка при получении подписок'})
    }
})
export const getMe=createAsyncThunk('auth/getMe',async(_,{rejectWithValue})=>{
    const token=window.localStorage.getItem('aviaBlogToken');
    if (!token) {
        return rejectWithValue({message:'Вы не авторизованы!'});
    } else {
        const cfg={
            headers:{
                "Content-Type": "application/json",
                'Authorization':`Bearer ${token}`,
            }
        }
        const res=await axios.get('/auth/me',cfg);
        if (res.status>=200&& res.status<=399) {
            
            return res.data
        } else {
            
        }
    }
 
})
export const login=createAsyncThunk('auth/login',async(body,{rejectWithValue})=>{
    try {
        const res=await axios.post('/auth/login',body);
        console.log(res);
        if(res.status>=200 && res.status<=399){
            window.localStorage.removeItem('aviaBlogToken');
            window.localStorage.setItem('aviaBlogToken',res.data.token);
            console.log(res.data);
            return res.data
        }else{
            return rejectWithValue(res.data);
        }
    } catch (err) {
        // throw Error(err.message);
        return rejectWithValue(err.message);
    }
});
export const registerUser=createAsyncThunk('auth/register',async(body,{rejectWithValue})=>{
    try {
        // console.log(body);
        const res= await axios.post('/auth/register',body);
        
        if(res.ok){
            console.log(res.data);
            return res.data
        }else{
            return rejectWithValue({message:'Не удалось авторизоваться!'})
        }
    } catch (err) {
        return rejectWithValue({message:'Не удалось авторизоваться!'})
    }
})
const authSlice=createSlice({
  name:'auth',
  initialState:{
    isAuth:false,
    user:{},
    subs:{
        status:'loading',
        data:[]
    },
    authStatus:{
        loggedIn:false,
        message:null
    }
  },
  reducers:{
    logout:(state)=>{
        window.localStorage.removeItem('aviaBlogToken');
        state.isAuth=false
    }
  },
  extraReducers:{
    [getMe.fulfilled]:(state,action)=>{
        state.isAuth=true;
        state.user=action.payload;
        state.authStatus.loggedIn=true
        state.authStatus.message=`C возвращением ${action.payload.fullname}`
    },
    [getMe.rejected]:(state,action)=>{
        state.isAuth=false;
        state.user={};
        
    },
    [registerUser.fulfilled]:(state,action)=>{
        state.isAuth=true;
        state.user=action.payload.user;
        state.authStatus.loggedIn=true;
        state.authStatus.message=`Добро пожаловать, ${action.payload.user.fullname}`
        
    },
    [registerUser.rejected]:(state,action)=>{
        state.isAuth=false;
        state.user={};
        state.authStatus.loggedIn=false;
        state.authStatus.message=action.payload;
    },
    [login.pending]:(state,action)=>{
        
    },
    [login.fulfilled]:(state,action)=>{
        state.isAuth=true;
        state.user=action.payload.user;
        state.authStatus.loggedIn=true;
        state.authStatus.message=`Привет, ${action.payload.user.fullname}`
        
        
    },
    [login.rejected]:(state,action)=>{
        state.isAuth=false;
        state.user={};
        state.authStatus.loggedIn=false;
        state.authStatus.message=action.payload;
    },
    [getSubs.pending]:(state,action)=>{
        state.subs.status='loading'
    },
    [getSubs.fulfilled]:(state,action)=>{
        state.subs.status='loaded'
        state.subs.data=action.payload
    },
    [getSubs.rejected]:(state,action)=>{
        state.subs.status='err'
    },
  },
});
export const {logout}=authSlice.actions;
export default authSlice.reducer;