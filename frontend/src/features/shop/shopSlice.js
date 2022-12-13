import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  arts: [],
  art: {},
  imgSrc: '',
  isLoading: false,
  isArtLoading: false,
  isSuccess: false,
  error: null,
};
const shopServer = 'http://localhost:5000/api/arts';
export const getArts = createAsyncThunk(
  'shop/getArts',
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(shopServer);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getArtsByCategory = createAsyncThunk(
  'shop/getArtsByCategory',
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(shopServer + `?category=${args}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getArt = createAsyncThunk(
  'shop/getArt',
  async (artID, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(shopServer + '/' + artID);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getartsAuthor = createAsyncThunk(
  'shop/getartsAuthor',
  async (authorId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(shopServer + `/artist/${authorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: {
    [getArts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getArts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.arts = action.payload;
    },
    [getArts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get for art page
    [getArt.pending]: (state, action) => {
      state.isArtLoading = true;
    },
    [getArt.fulfilled]: (state, action) => {
      state.isArtLoading = false;
      state.art = action.payload;
      state.isSuccess = true;
      [state.imgSrc] = state.art.images;
    },
    [getArt.rejected]: () => { },
    [getArtsByCategory.pending]: (state, action) => {
      state.isArtLoading = true;
    }, [getArtsByCategory.fulfilled]: (state, action) => {
      state.isArtLoading = false;
      state.arts = action.payload;
    }, [getArtsByCategory.rejected]: (state, action) => {
    },



    [getartsAuthor.pending]: (state, action) => {
      state.isArtLoading = true;
    }, [getartsAuthor.fulfilled]: (state, action) => {
      state.isArtLoading = false;
      state.arts = action.payload;
    },
  },
});
export const shopReducer = shopSlice.reducer;
export const shopActions = shopSlice.actions;
