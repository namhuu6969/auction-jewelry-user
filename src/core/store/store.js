import { configureStore } from '@reduxjs/toolkit';
import auctionListReducer from './AuctionListStore/auctionList';
import authReducer from './Auth/auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    auctionList: auctionListReducer
  }
});

export default store;
