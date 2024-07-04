import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auctionData: {},
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAuctionCheckout: (state, action) => {
      state.auctionData = action.payload;
    },
    clearDataAfterCheckout: (state) => {
      state.auctionData = {}
    }
  },
});

export const { setAuctionCheckout, clearDataAfterCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer
