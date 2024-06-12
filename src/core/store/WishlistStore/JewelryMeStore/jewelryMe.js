import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collection: [],
  brand: [],
  category: [],
  material: [],
  jewelryId: null,
  jewelryData: [],
  render: false
};

const jewelryMeSlice = createSlice({
  name: 'jewelryMe',
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
    setJewelryData: (state, action) => {
      state.jewelryData = action.payload;
    },
    setRender: (state, action) => {
      state.render = action.payload
    },
    setMaterial: (state, action) => {
      state.material = action.payload
    }
  },
});

export const {
  setCollection,
  setBrand,
  setCategory,
  setJewelryId,
  setJewelryData,
  setRender,
  setMaterial,
} = jewelryMeSlice.actions;

export default jewelryMeSlice.reducer;
