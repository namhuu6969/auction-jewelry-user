import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myAuctionData: [],
  renderMyAuction: false
};

const myAuctionSlice = createSlice({
  name: 'myAuction',
  initialState,
  reducers: {
    setMyAuctionData: (state, action) => {
      state.myAuctionData = action.payload
    },
    setRenderMyAuction: (state, action) => {
      state.renderMyAuction = action.payload
    }
  }
})

export const {
  setMyAuctionData,
  setRenderMyAuction,
} = myAuctionSlice.actions;

export default myAuctionSlice.reducer;
