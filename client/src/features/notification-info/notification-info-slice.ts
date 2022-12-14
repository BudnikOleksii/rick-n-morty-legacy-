import { createSlice } from '@reduxjs/toolkit';
import { IErrors } from '../../types/response';
import { Status } from '../../types/status';

interface NotificationInfo {
  errors: IErrors;
  actions: string[];
}

const initialState: NotificationInfo = {
  errors: null,
  actions: [],
};

const notificationInfoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.actions.push(action.payload);
    },
    finishAction: (state, action) => {
      state.actions = state.actions.filter((act) => act !== action.payload);
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
      state.actions = [];
    },
    setDefaultStatus: (state) => {
      state.errors = null;
    },
  },
});

export const { registerAction, finishAction, setErrors, setDefaultStatus } =
  notificationInfoSlice.actions;

export default notificationInfoSlice.reducer;
