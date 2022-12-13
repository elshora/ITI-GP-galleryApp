import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import APIServices from "../../apiService";

const TOKEN = JSON.parse(localStorage.getItem('user'))

const initialState = {
    arts: [],
    isLoading: false,
    isError: false,
}

export const getArts = createAsyncThunk("arts/getArts", async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.get('/arts', TOKEN)

    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const deleteArt = createAsyncThunk("arts/deleteArt", async (args, thunkAPI) => {
    const artrId = args
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await APIServices.remove(`/arts/${artrId}`, TOKEN)
        return await dispatch(getArts())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const addArt = createAsyncThunk("arts/addArt", async (args, thunkAPI) => {
    const userData = args
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.create('/arts/', userData, TOKEN)
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const updateArt = createAsyncThunk("arts/updateArt", async (args, thunkAPI) => {
    const { userData, artId } = args

    const { rejectWithValue, dispatch } = thunkAPI
    try {

        await APIServices.update(`/arts/${artId}`, userData, TOKEN)
        return await dispatch(getArts())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})



const ArtSlice = createSlice({
    name: "arts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getArts.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getArts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.arts = action.payload
                state.isError = false
            })
            .addCase(getArts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            }).addCase(addArt.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            }).addCase(addArt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.arts.push(action.payload)
                state.isError = false
            }).addCase(addArt.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            }).addCase(updateArt.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            }).addCase(updateArt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.arts.push(action.payload)
                state.isError = false
            }).addCase(updateArt.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
    }
})



export const artsReducer = ArtSlice.reducer