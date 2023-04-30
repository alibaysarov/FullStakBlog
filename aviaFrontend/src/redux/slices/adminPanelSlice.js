import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'
export const addPost=createAsyncThunk('admin/addPost',async(_,{getState})=>{
    const{postImage,tags,titleInputValue,content}=getState().adminPanel;
    let body={
        title:titleInputValue,
        tags,
        content
    }
    
    let formData=new FormData()
    formData.append("filedata",postImage);
    formData.append("body",JSON.stringify(body));
    console.log(formData.get("body"));
    const res=await axios.post('/addPost',formData);
    console.log(res);
    if(res.ok){
        console.log('Пост добавлен!!!');
    }
     
})
const adminPanelSlice=createSlice({
    name:'admin',
    initialState:{
        titleInputValue:'',
        imagePath:'',
        postImage:null,
        tagInputValue:'',
        content:'',
        tags:[],
        category:{},
    },
    reducers:{
        inputContentHandler:(state,action)=>{
            state.content=action.payload;
        },
        setImagePath:(state,action)=>{
            // state.imagePath=action.payload.name;
            const file=action.payload.file;
            state.postImage=file;
            console.log(file);
        },
        inputTitleHandler:(state,action)=>{
            state.titleInputValue=action.payload.value;
        },
        inputTagsHandler:(state,action)=>{
            state.tagInputValue=action.payload.value;
        },
        addTagHandler:(state)=>{
            state.tags.push(state.tagInputValue);
            console.log(state.tags);
            state.tagInputValue='';
        },
        deleteTagHandler:(state,action)=>{
            state.tags=state.tags.filter((item,id)=>id!==action.payload.id)
        }
    },
    extraReducers:{
        [addPost.fulfilled]:(state,action)=>{
            console.log(action.payload);
        }
    }
})
export const {inputTagsHandler,inputTitleHandler,addTagHandler,deleteTagHandler,setImagePath,inputContentHandler}=adminPanelSlice.actions
export default adminPanelSlice.reducer