import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const artServer = 'http://localhost:5000/api/arts/';
// const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  updatedArt: {},
  requiredArt: {},
  categories: [],
  errorUpdate: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// for dashboard - only for admin
export const updateAllData = createAsyncThunk(
  'updateArt/updateAllData',
  async ({ id, art }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(artServer + id, art);
      return response.data;
    } catch (err) {
      return rejectWithValue;
    }
  }
);

const updateArtSlice = createSlice({
  name: 'updateArt',
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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAllData.pending, (state, { payload }) => {
      state.updatedArt = payload;
      state.isLoading = true;
    });
    builder.addCase(updateAllData.fulfilled, (state, { payload }) => {
      state.updatedArt = payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateAllData.rejected, (state, { payload }) => {
      state.errorMessage = payload;
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const updateArtReducer = updateArtSlice.reducer;
export const { removeCategory, addCategory, selectArtToUpdate, setCategories } =
  updateArtSlice.actions;
