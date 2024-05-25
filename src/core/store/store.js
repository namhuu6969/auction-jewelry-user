import { configureStore } from '@reduxjs/toolkit';
import auctionListReducer from './AuctionListStore/auctionList';

const store = configureStore({
  reducer: {
    auctionList: auctionListReducer
  }
});

export default store;
