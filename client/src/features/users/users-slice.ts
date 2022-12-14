import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { IUser } from '../../types/user';

interface UsersState {
  users: Maybe<IUser[]>;
  usersInfo: Maybe<IResponseInfo>;
}

const initialState: UsersState = {
  users: null,
  usersInfo: null,
};

const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    usersLoadingStart: (state, action) => {},
    addNewRoleStart: (state, action) => {},
    usersSuccess: (state, action) => {
      state.users = action.payload.results;
      state.usersInfo = action.payload.info;
    },
    addNewRoleSuccess: (state, action) => {
      state.users =
        state.users?.map((user) => (user.id === action.payload.id ? action.payload : user)) || null;
    },
  },
});

export const { usersLoadingStart, usersSuccess, addNewRoleStart, addNewRoleSuccess } =
  usersSlice.actions;

export default usersSlice.reducer;
