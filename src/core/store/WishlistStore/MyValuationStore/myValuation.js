import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myValuationData: [],
  renderMyValuation: false
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
    }
  }
})

export const {
  setMyValuation,
  setRenderMyValuation,
} = myValuationSlice.actions;

export default myValuationSlice.reducer;
