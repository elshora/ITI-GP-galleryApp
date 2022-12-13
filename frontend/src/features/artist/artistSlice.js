import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const userServer = "http://localhost:5000/api/users";
const initialState = {
  artist: {},
  artists: []
};
export const getArtist = createAsyncThunk(
  "artist/getArtist",
  async (artistId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(userServer + "/" + artistId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getArtists = createAsyncThunk(
  "artist/getArtists",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(userServer + "/artists");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: {
    [getArtist.fulfilled]: (state, action) => {
      state.artist = action.payload;
    },
    [getArtists.fulfilled]: (state, action) => {
      state.artists = action.payload;
    }
  },
});
export const artistReducer = artistSlice.reducer;
