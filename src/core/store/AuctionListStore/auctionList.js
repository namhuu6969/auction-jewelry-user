import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auctionListData: []
};

const auctionListSlice = createSlice({
  name: 'auctionList',
  initialState,
  reducers: {
    setListAuction: (state, action) => {
      state.auctionListData = action.payload;
    }
  }
});

export const {
  setListAuction
} = auctionListSlice.actions;

export default auctionListSlice.reducer;
