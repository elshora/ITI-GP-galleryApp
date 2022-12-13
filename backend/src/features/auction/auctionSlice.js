import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auctionApi } from './auctionApi'


const initialState = {
  auctionArts: [],
  currentAuctionData: [],
  isLoading: false,
  isError: false,
}

export const getAuction = createAsyncThunk('auction/getAll', async (_args, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    return await auctionApi.getAll();
  } catch (error) {
    return rejectWithValue(error.message)

  }
})
export const addAuction = createAsyncThunk('auction/add',
  /**
   * 
   * @param {{data:{}}} args 
   * @param {*} thunkAPI 
   * @returns 
   */
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { data } = args
    try {
      return await auctionApi.add(data);
    } catch (error) {
      return rejectWithValue(error.message)

    }
  }
)
export const removeAuction = createAsyncThunk('auction/remove',
  /**
   * 
   * @param {{id:string}} args 
   * @param {*} thunkAPI 
   * @returns 
   */
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { id } = args
    try {
      return await auctionApi.remove(id);
    } catch (error) {
      return rejectWithValue(error.message)

    }
  }
)
export const updateAuction = createAsyncThunk('auction/update',
  /**
   * 
   * @param {{id:string;data:{}}} args 
   * @param {*} thunkAPI 
   * @returns 
   */
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { id, data } = args
    try {
      return await auctionApi.update(id, data);
    } catch (error) {
      return rejectWithValue(error.message)

    }
  }
)
export const addBid = createAsyncThunk('auction/addBid',
  /**
   * 
   * @param {{artId:string;data:{bidder:string;bid:number}}} args 
   * @param {*} thunkAPI 
   * @returns 
   */
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { id, data } = args
    console.log(id);
    try {
      return await auctionApi.addBid(id, data);
    } catch (error) {
      return rejectWithValue(error.message)

    }
  }
)

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAuction.pending, (state) => {
        state.isLoading = true;
        state.isError = false
      }).addCase(getAuction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionArts = action.payload
        state.isError = false
      }).addCase(getAuction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload
      }).addCase(addAuction.pending, (state) => {
        state.isLoading = true;
        state.isError = false
      }).addCase(addAuction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionArts.push(action.payload)
        state.isError = false
      }).addCase(addAuction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      }).addCase(removeAuction.pending, (state) => {
        state.isLoading = true;
        state.isError = false
      }).addCase(removeAuction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionArts.push(action.payload)
        state.isError = false
      }).addCase(removeAuction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      }).addCase(updateAuction.pending, (state) => {
        state.isLoading = true;
        state.isError = false
      }).addCase(updateAuction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionArts.push(action.payload)
        state.isError = false
      }).addCase(updateAuction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      }).addCase(addBid.pending, (state) => {
        state.isLoading = true;
        state.isError = false
      }).addCase(addBid.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.auctionArts.push(action.payload)
        state.isError = false
      }).addCase(addBid.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      })
  }
})

export const auctionReducer = auctionSlice.reducer;