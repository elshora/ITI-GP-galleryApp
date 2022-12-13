import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
let login = false;
const localStorageItems = localStorage.getItem('cart');
const serverUrl = 'http://localhost:5000/api';
let userId = '6345a0ace110b2df5eb0db6f';
let initialState = {
  userCart: [],
  cartItems: localStorageItems ? JSON.parse(localStorageItems) : [],
  totalQuantity: 0,
  totalPrice: 0,
  isLoading: true,
};

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`${serverUrl}/cart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (userCart, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const serverItems = [];
    try {
      userCart.arts.forEach(async (ele) => {
        const response = await axios.get(`${serverUrl}/arts/${ele.artId}`);
        console.log(response.data);
        serverItems.push(response.data);
        console.log(serverItems);
        return serverItems;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state, action) => {
      if (login) {
        //  server code
      } else {
        state.cartItems = [];
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      if (login) {
        //  server code
      } else {
        state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item._id === itemId);
      cartItem.quantity = cartItem.quantity + 1;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item._id === itemId);
      cartItem.quantity = cartItem.quantity - 1;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    // update: (state, action) => {
    //   const updatedItem = action.payload;
    //   const itemIndex = state.cartItems.findIndex(
    //     (item) => item._id === updatedItem._id
    //   );
    //   if (login) {
    //   } else {
    //     state.cartItems[itemIndex].quantity = updatedItem.quantity;
    //     localStorage.setItem('cart', JSON.stringify(state.cartItems));
    //   }
    // },
    addTocart: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );
      if (login) {
        //  server code
      } else {
        itemIndex !== -1
          ? console.log('aded')
          : state.cartItems.push({
              ...newItem,
              quantity: 1,
            });
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
    calulateTotals: (state) => {
      let totalQuantity = 0;
      let totalPrice = 0;
      state.cartItems.forEach((item) => {
        totalQuantity += Number(item.quantity);
        totalPrice += item.quantity * item.price;
      });
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
  },
  extraReducers: {
    [getCart.fulfilled]: (state, action) => {
      state.userCart = action.payload;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const {
  clearCart,
  removeItem,
  update,
  calulateTotals,
  addTocart,
  increase,
  decrease,
} = cartSlice.actions;
