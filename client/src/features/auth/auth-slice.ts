import { Maybe } from '../../types/maybe';
import { IUser } from '../../types/user';
import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage } from '../../helpers/localstorage-helpers';
import { checkIsAdmin } from '../../helpers/check-is-admin';

const user: IUser = getItemFromLocalStorage('user');

interface AuthState {
  user: Maybe<IUser>;
  authIsloading: boolean;
  authErrors: Maybe<string[]>;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user,
  authIsloading: false,
  authErrors: null,
  isLoggedIn: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuthStart: (state) => {
      state.authIsloading = true;
      state.authErrors = null;
      state.isLoggedIn = false;
    },
    loginStart: (state, action) => {
      state.authIsloading = true;
      state.authErrors = null;
    },
    registrationStart: (state, action) => {
      state.authIsloading = true;
      state.authErrors = null;
    },
    logoutStart: (state) => {
      state.authIsloading = true;
      state.authErrors = null;
    },
    authSuccess: (state, action) => {
      state.authIsloading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.isAdmin = checkIsAdmin(action.payload.user.roles);
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.authIsloading = false;
      state.user = null;
      state.isAdmin = false;
    },
    authError: (state, action) => {
      state.authIsloading = false;
      state.authErrors = action.payload;
    },
  },
});

export const {
  checkAuthStart,
  loginStart,
  registrationStart,
  authSuccess,
  authError,
  logoutStart,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
