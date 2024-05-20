
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'main',
  initialState: {
    userData: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.userData;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
