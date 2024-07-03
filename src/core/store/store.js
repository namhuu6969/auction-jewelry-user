import { configureStore } from '@reduxjs/toolkit';
import auctionListReducer from './AuctionListStore/auctionList';
import personalReducer from './PersonalStore/personal';
import authReducer from './Auth/auth';
import jewelryMeReducer from './WishlistStore/JewelryMeStore/jewelryMe';
import myAuctionReducer from './WishlistStore/MyAuctionStore/myAuction';
import myValuationReducer from './WishlistStore/MyValuationStore/myValuation';
import checkoutReducer from './Checkout/checkoutSlice';
import deliveryReducer from './Delivery/deliverySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    auctionList: auctionListReducer,
    jewelryMe: jewelryMeReducer,
    myAuction: myAuctionReducer,
    myValuation: myValuationReducer,
    personal: personalReducer,
    checkout: checkoutReducer,
    delivery: deliveryReducer
  },
});

export default store;
