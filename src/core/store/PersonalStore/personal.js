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
      localStorage.setItem('user', JSON.parse(action.payload.user));
    },
    clearUserData: (state) => {
      state.user = null;
      state.money = 0;
    },
  },
});

export const { setUserData, clearUserData } = personalSlice.actions;

export default personalSlice.reducer;
