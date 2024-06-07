import { configureStore } from '@reduxjs/toolkit';
import auctionListReducer from './AuctionListStore/auctionList';
import authReducer from './Auth/auth';
import wishlistReducer from './WishlistStore/wishlist';

const store = configureStore({
  reducer: {
    auth: authReducer,
    auctionList: auctionListReducer,
    wishlist: wishlistReducer
  }
});

export default store;
