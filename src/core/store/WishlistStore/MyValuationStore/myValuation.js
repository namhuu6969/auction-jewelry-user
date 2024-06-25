import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myValuationData: [],
  renderMyValuation: false,
  onlineValuation: {}
};

const myValuationSlice = createSlice({
  name: 'myAuction',
  initialState,
  reducers: {
    setMyValuation: (state, action) => {
      state.myValuationData = action.payload
    },
    setRenderMyValuation: (state, action) => {
      state.renderMyValuation = action.payload
    },
    setOnlineValuation: (state, action) => {
      state.onlineValuation = action.payload
    }
  }
})

export const {
  setMyValuation,
  setRenderMyValuation,
  setOnlineValuation
} = myValuationSlice.actions;

export default myValuationSlice.reducer;
