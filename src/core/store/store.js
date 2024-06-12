import { configureStore } from '@reduxjs/toolkit';
import auctionListReducer from './AuctionListStore/auctionList';
import authReducer from './Auth/auth';
import jewelryMeReducer from './WishlistStore/JewelryMeStore/jewelryMe';
import myAuctionReducer from './WishlistStore/MyAuctionStore/myAuction';
import myValuationReducer from './WishlistStore/MyValuationStore/myValuation';

const store = configureStore({
  reducer: {
    auth: authReducer,
    auctionList: auctionListReducer,
    jewelryMe: jewelryMeReducer,
    myAuction: myAuctionReducer,
    myValuation: myValuationReducer,
  }
});

export default store;
