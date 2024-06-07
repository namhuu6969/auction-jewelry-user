import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collection: [],
  brand: [],
  category: [],
  jewelryId: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setJewelryId: (state, action) => {
      state.jewelryId = action.payload;
    },
  },
});

export const { setCollection, setBrand, setCategory, setJewelryId } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
