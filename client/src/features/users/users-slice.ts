import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response-info';
import { IUser } from '../../types/user';

interface UsersState {
  users: Maybe<IUser[]>;
  usersInfo: Maybe<IResponseInfo>;
  usersIsloading: boolean;
  usersErrors: Maybe<string[]>;
}

const initialState: UsersState = {
  users: null,
  usersInfo: null,
  usersIsloading: false,
  usersErrors: null,
};

const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    usersLoadingStart: (state, action) => {
      state.usersIsloading = true;
      state.usersErrors = null;
    },
    usersSuccess: (state, action) => {
      state.usersIsloading = false;
      state.users = action.payload.results;
      state.usersInfo = action.payload.info;
    },
    usersError: (state, action) => {
      state.usersIsloading = false;
      state.usersErrors = action.payload;
    },
    usersRemoveErrors: (state) => {
      state.usersErrors = null;
    },
  },
});

export const { usersLoadingStart, usersSuccess, usersError, usersRemoveErrors } =
  usersSlice.actions;

export default usersSlice.reducer;
