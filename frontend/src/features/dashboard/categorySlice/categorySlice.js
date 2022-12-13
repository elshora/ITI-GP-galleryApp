import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import APIServices from "../../apiService";

const TOKEN = JSON.parse(localStorage.getItem('user'))

const initialState = {
    categories: [],
    isLoading: false,
    isError: false,
}

export const getCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {

        return await APIServices.get('/category', TOKEN)

    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (args, thunkAPI) => {
    const categoryId = args
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await APIServices.remove(`/category/${categoryId}`, TOKEN)
        return await dispatch(getCategories())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const addCategory = createAsyncThunk("categories/addCategory", async (args, thunkAPI) => {
    const categoryData = args;
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await APIServices.create('/category', categoryData, TOKEN)
        return await dispatch(getCategories())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const updateCategory = createAsyncThunk("categories/updateCategory", async (args, thunkAPI) => {
    const { categoryData, categoryId } = args

    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await APIServices.update(`/category/${categoryId}`, categoryData, TOKEN)
        return await dispatch(getCategories())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
const CategorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getCategories.fulfilled, (state, action) => {

                state.isLoading = false;
                state.categories = action.payload
                state.isError = false
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })
    }
})



export const CategoryReducer = CategorySlice.reducer