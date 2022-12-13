import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import APIServices from "../../apiService";

const TOKEN = JSON.parse(localStorage.getItem('user'))

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
}

export const getUsers = createAsyncThunk("Users/getUsers", async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.get('/users', TOKEN)

    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const deleteUser = createAsyncThunk("users/deleteUser", async (args, thunkAPI) => {
    const userId = args
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await APIServices.remove(`/users/${userId}`, TOKEN)
        return await dispatch(getUsers())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const addUser = createAsyncThunk("users/addUser", async (args, thunkAPI) => {
    const userData = args
    const { rejectWithValue } = thunkAPI
    try {
        return await APIServices.create('/users/register', userData, TOKEN)
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const updateUser = createAsyncThunk("users/updateUser", async (args, thunkAPI) => {
    const { userData, userId } = args

    const { rejectWithValue, dispatch } = thunkAPI
    try {

        await APIServices.update(`/users/${userId}`, userData, TOKEN)
        return await dispatch(getUsers())
    } catch (error) {
        return rejectWithValue(error.message)
    }

})



const UsersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload
                state.isError = false
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            }).addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            }).addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users.push(action.payload)
                state.isError = false
            }).addCase(addUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            }).addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            }).addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users.push(action.payload)
                state.isError = false
            }).addCase(updateUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            })
    }
})



export const UsersReducer = UsersSlice.reducer