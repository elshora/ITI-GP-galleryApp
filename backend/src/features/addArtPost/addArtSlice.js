import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const artServer = 'http://localhost:5000/api/arts/';
const initialState = {
  art: {},
  artId: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  categories: [],
};

export const addPost = createAsyncThunk(
  'postArt/addPost',
  async (art, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        artServer,
        art
        //   , {
        //   headers: { 'content-type': 'multipart/form-data' },
        // }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(rejectWithValue);
    }
  }
);

const addArtSlice = createSlice({
  name: 'postArt',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (ele) => ele !== action.payload
      );
    },

    clearPostState: (state, action) => {
      state.isSuccess = action.payload;
      state.artId = '';
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.art = action.payload;
        state.artId = action.payload._id;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.art = null;
      });
  },
});
export const addArtReducer = addArtSlice.reducer;
export const { removeCategory, addCategory, clearPostState } =
  addArtSlice.actions;
