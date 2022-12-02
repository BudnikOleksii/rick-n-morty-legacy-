import { Maybe } from '../types/maybe';
import { IUser } from '../types/user';
import { ITokens } from '../types/auth';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getItemFromLocalStorage } from '../helpers/localstorage-helpers';

const tokens: ITokens = getItemFromLocalStorage('tokens');
const user: IUser = getItemFromLocalStorage('user');

interface UserState {
  tokens: Maybe<ITokens>;
  user: Maybe<IUser>;
  userIsloading: boolean;
  userErrors: Maybe<string[]>;
}

const initialState: UserState = {
  tokens,
  user,
  userIsloading: false,
  userErrors: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
      state.tokens = action.payload.tokens;
      state.user = action.payload.user;
    },
    authError: (state, action) => {
      state.userIsloading = false;
      state.userErrors = action.payload;
    },
  },
});

export const { loginStart, registrationStart, authSuccess, authError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
