import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myAuctionData: [],
  renderMyAuction: false,
  dataUpdate: {},
};

const myAuctionSlice = createSlice({
  name: 'myAuction',
  initialState,
  reducers: {
    setMyAuctionData: (state, action) => {
      state.myAuctionData = action.payload;
    },
    setRenderMyAuction: (state, action) => {
      state.renderMyAuction = action.payload;
    },
    setDataUpdate: (state, action) => {
      state.dataUpdate = action.payload;
    },
  },
});

export const { setMyAuctionData, setRenderMyAuction, setDataUpdate } =
  myAuctionSlice.actions;

export default myAuctionSlice.reducer;
