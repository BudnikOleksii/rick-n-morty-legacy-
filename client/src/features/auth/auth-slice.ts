import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage } from '../../helpers/localstorage-helpers';
import { checkIsAdmin } from '../../helpers/check-is-admin';
import { Maybe } from '../../types/helper-types';
import { IUser } from '../../types/user';

const user: IUser = getItemFromLocalStorage('user');

interface AuthState {
  user: Maybe<IUser>;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user,
  isLoggedIn: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuthStart: (state) => {
      state.isLoggedIn = false;
    },
    loginStart: (state, action) => {},
    registrationStart: (state, action) => {},
    logoutStart: (state) => {},
    authSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.isAdmin = checkIsAdmin(action.payload.user.roles);
    },
    setAuthDefaultState: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const {
  checkAuthStart,
  loginStart,
  registrationStart,
  authSuccess,
  logoutStart,
  setAuthDefaultState,
} = authSlice.actions;

export default authSlice.reducer;
