import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const { status, data } = await axios.get("/profile/" + id);
      if (status >= 200 && status <= 399) {
        return data;
      } else {
        return rejectWithValue({ err: "Ошибка при получении пользователя" });
      }
    } catch (err) {
      throw new Error(err);
      return rejectWithValue({ message: err.message });
    }
  }
);
export const savePost = createAsyncThunk(
  "user/savePost",
  async (id, { rejectWithValue }) => {
    const token = window.localStorage.getItem("aviaBlogToken");
    try {
      const cfg = {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      };
      const { status, data } = await axios.get(`/post/save/${id}`, cfg);
      if (status >= 200 && status <= 399) {
        return data;
      } else {
        return rejectWithValue({ err: "Ошибка при сохранении записи" });
      }
    } catch (err) {
      throw new Error(err);
      return rejectWithValue({ message: err.message });
    }
  }
);
const user = createSlice({
  name: "user",
  initialState: {
    profileInfo: {},
    status: "loading",
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.profileInfo = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.status = "err";
    },

    [savePost.rejected]: (state, action) => {
      console.log("Ошибка при добавлении в закладки");
    },
  },
});
export default user.reducer;
