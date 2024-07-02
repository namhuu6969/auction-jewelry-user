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
  },
});

export const { setAuctionCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer
