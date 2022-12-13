import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/artist/artistSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { shopReducer } from '../features/shop/shopSlice';
import authReducer from '../features/auth/authSlice';
import { CategoryReducer } from '../features/dashboard/categorySlice/categorySlice';
import { UsersReducer } from '../features/dashboard/userSlice/userSlice';
import { addArtReducer } from '../features/addArtPost/addArtSlice';
import { artsReducer } from '../features/dashboard/artSlice/artSlice';
import { ordersReducer } from '../features/dashboard/orders/ordersSlice';
import { auctionReducer } from '../features/auction/auctionSlice';
import { updateArtReducer } from '../features/updateArt/updateArtSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shop: shopReducer,
    auth: authReducer,
    artist: artistReducer,
    users: UsersReducer,
    categories: CategoryReducer,
    postArt: addArtReducer,
    arts: artsReducer,
    orders: ordersReducer,
    updateArt: updateArtReducer,
    auction: auctionReducer,
  },
});
