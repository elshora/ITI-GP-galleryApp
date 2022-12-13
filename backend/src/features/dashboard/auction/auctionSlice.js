import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import APIServices from "../../apiService";

const TOKEN = JSON.parse(localStorage.getItem('user'))

const initialState = {
    auctions: [],
    isLoading: false,
    isError: false,
}

export const getAuctions = createAsyncThunk("auctions/getAuctions", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.get('/auction', TOKEN)

    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const deleteAuction = createAsyncThunk("auctions/deleteAuction", async (args, thunkAPI) => {
    const orderId = args
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await APIServices.remove(`/auction/${orderId}`, TOKEN)
        return await dispatch(getAuctions())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const addAuction = createAsyncThunk("auctions/addAuction", async (args, thunkAPI) => {
    const userData = args
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.create('/auction/', userData, TOKEN)
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const updateAuction = createAsyncThunk("auctions/updateAuction", async (args, thunkAPI) => {
    const { userData, auctionId } = args

    const { rejectWithValue, dispatch } = thunkAPI
    try {

        await APIServices.update(`/auction/${auctionId}`, userData, TOKEN)
        return await dispatch(getAuctions())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})



const AuctionSlice = createSlice({
    name: "auctions",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAuctions.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getAuctions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctions = action.payload
                state.isError = false
            })
            .addCase(getAuctions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            }).addCase(addAuction.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            }).addCase(addAuction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctions.push(action.payload)
                state.isError = false
            }).addCase(addAuction.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            }).addCase(updateAuction.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            }).addCase(updateAuction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctions.push(action.payload)
                state.isError = false
            }).addCase(updateAuction.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
    }
})



export const auctionsReducer = AuctionSlice.reducer