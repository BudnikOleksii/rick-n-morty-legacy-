import { Maybe } from '../../types/maybe';
import { IUser } from '../../types/user';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getItemFromLocalStorage } from '../../helpers/localstorage-helpers';

const user: IUser = getItemFromLocalStorage('user');

interface AuthState {
  user: Maybe<IUser>;
  authIsloading: boolean;
  authErrors: Maybe<string[]>;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user,
  authIsloading: false,
  authErrors: null,
  isLoggedIn: false,
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
    authSuccess: (state, action) => {
      state.authIsloading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    authError: (state, action) => {
      state.authIsloading = false;
      state.authErrors = action.payload;
    },
  },
});

export const { checkAuthStart, loginStart, registrationStart, authSuccess, authError } =
  authSlice.actions;

export default authSlice.reducer;
