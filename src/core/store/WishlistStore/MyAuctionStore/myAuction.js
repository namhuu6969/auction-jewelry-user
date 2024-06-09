import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myAuctionData: []
};

const myAuctionSlice = createSlice({
  name: 'myAuction',
  initialState,
  reducers: {
    setMyAuctionData: (state, action) => {
      state.myAuctionData = action.payload
    }
  }
})

export const {
  setMyAuctionData
} = myAuctionSlice.actions;

export default myAuctionSlice.reducer;
