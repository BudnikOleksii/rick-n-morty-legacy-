import { Maybe } from '../types/maybe';
import { IUser } from '../types/user';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getItemFromLocalStorage } from '../helpers/localstorage-helpers';

const user: IUser = getItemFromLocalStorage('user');

interface UserState {
  user: Maybe<IUser>;
  userIsloading: boolean;
  userErrors: Maybe<string[]>;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user,
  userIsloading: false,
  userErrors: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkAuthStart: (state) => {
      state.userIsloading = true;
      state.userErrors = null;
      state.isLoggedIn = false;
    },
    loginStart: (state, action) => {
      state.userIsloading = true;
      state.userErrors = null;
    },
    registrationStart: (state, action) => {
      state.userIsloading = true;
      state.userErrors = null;
    },
    authSuccess: (state, action) => {
      state.userIsloading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    authError: (state, action) => {
      state.userIsloading = false;
      state.userErrors = action.payload;
    },
  },
});

export const { checkAuthStart, loginStart, registrationStart, authSuccess, authError } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
