import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auctionIdDelivery: {}
}

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDelivery: (state, action) => {
      state.auctionIdDelivery = action.payload
    }
  }
})

export const {setDelivery} = deliverySlice.actions
export default deliverySlice.reducer
