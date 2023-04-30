import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addLike = createAsyncThunk(
  "posts/setLike",
  async ({ id }, { getState }) => {
    const { isLiked } = getState().posts;
    console.log(isLiked);
    const { status } = await axios.get(`/post/${id}/likes?liked=${isLiked}`);
    if (status != 200) {
      console.log("Ошибка");
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("aviaBlogToken");
      const { data } = await axios.get("/posts", {
        headers: {
          Authorization: `Bearer: ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue({ message: "Не удалось получить записи" });
    }
  }
);

export const getQueriedPosts = createAsyncThunk(
  "posts/filterPosts",
  async (query, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("aviaBlogToken");
      const { data } = await axios.get(`/posts/query?filter=${query}`, {
        headers: {
          Authorization: `Bearer: ${token}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue({ message: "Не удалось получить записи" });
    }
  }
);
export const getOnePost = createAsyncThunk(
  "posts/getOnePost",
  async ({ id }) => {
    const { data } = await axios.get(`/posts/${id}`);
    if (!data) {
      throw Error("Ошибка при загрузке поста");
    } else {
      return { ...data };
    }
  }
);

export const getPostsByTag = createAsyncThunk(
  "posts/getPostsByTag",
  async ({ tag }) => {
    const { data } = await axios.get(`tags/${tag}`);
    if (!data) {
      throw Error("Ошибка при загрузке поста");
    } else {
      return data;
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "laoding",
    currentPost: {},
    posts: [],
    isLiked: false,
    isSaved: false,
    taggedPosts: [],
  },
  reducers: {
    addLikesHandler: (state) => {
      state.isLiked = !state.isLiked;
      console.log(state.isLiked);
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "err";
    },
    [getOnePost.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = "loaded";
      state.currentPost = action.payload;
    },
    [getPostsByTag.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.taggedPosts = action.payload;
    },
    [getQueriedPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQueriedPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.posts = action.payload;
    },
    [getQueriedPosts.rejected]: (state, action) => {
      state.status = "err";
    },
  },
});
export const { addLikesHandler } = postsSlice.actions;
export default postsSlice.reducer;
