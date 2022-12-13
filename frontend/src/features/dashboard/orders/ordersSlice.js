import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import APIServices from "../../apiService";

const TOKEN = JSON.parse(localStorage.getItem('user'))

const initialState = {
    orders: [],
    isLoading: false,
    isError: false,
}

export const getOrders = createAsyncThunk("order/getOrders", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.get('/order', TOKEN)

    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (args, thunkAPI) => {
    const orderId = args
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await APIServices.remove(`/order/${orderId}`, TOKEN)
        return await dispatch(getOrders())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const getOrder = createAsyncThunk("order/getOrder", async (args, thunkAPI) => {
    const userData = args
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.getOne(`/order/${args}`, userData, TOKEN)
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const updateOrder = createAsyncThunk("order/updateOrder", async (args, thunkAPI) => {
    const { userData, orderId } = args

    const { rejectWithValue, dispatch } = thunkAPI
    try {

        await APIServices.update(`/order/${orderId}`, userData, TOKEN)
        return await dispatch(getOrders())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})



const OrderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload
                state.isError = false
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            }).addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            }).addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders.push(action.payload)
                state.isError = false
            }).addCase(updateOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
    }
})



export const ordersReducer = OrderSlice.reducer