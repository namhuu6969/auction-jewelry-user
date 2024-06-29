import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  money: 0,
};

const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.money = action.payload.money;
      localStorage.setItem('money', action.payload.money);
    },
    clearUserData: (state) => {
      state.user = null;
      state.money = 0;
      localStorage.removeItem('money')
    },
  },
});

export const { setUserData, clearUserData } = personalSlice.actions;

export default personalSlice.reducer;
