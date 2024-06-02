import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  fullName: localStorage.getItem('fullName') || ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { accessToken, refreshToken, fullName } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.fullName = fullName
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('fullName', fullName)
    },
    clearToken: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.fullName = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('fullName')
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
