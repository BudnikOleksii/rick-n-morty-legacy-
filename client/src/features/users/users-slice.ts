import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response';
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
    addNewRoleStart: (state, action) => {
      state.usersIsloading = true;
      state.usersErrors = null;
    },
    usersSuccess: (state, action) => {
      state.usersIsloading = false;
      state.users = action.payload.results;
      state.usersInfo = action.payload.info;
    },
    addNewRoleSuccess: (state, action) => {
      state.usersIsloading = false;
      state.users =
        state.users?.map((user) => (user.id === action.payload.id ? action.payload : user)) || null;
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

export const {
  usersLoadingStart,
  usersSuccess,
  usersError,
  usersRemoveErrors,
  addNewRoleStart,
  addNewRoleSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
