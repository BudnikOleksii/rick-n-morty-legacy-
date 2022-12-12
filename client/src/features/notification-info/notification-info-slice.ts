import { createSlice } from '@reduxjs/toolkit';
import { IErrors } from '../../types/response';
import { Status } from '../../types/status';

interface NotificationInfo {
  status: Status;
  errors: IErrors;
}

const initialState: NotificationInfo = {
  status: 'SUCCEEDED',
  errors: null,
};

const notificationInfoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.errors = null;
      state.status = 'PENDING';
    },
    loadingSuccess: (state) => {
      state.status = 'SUCCEEDED';
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
      state.status = 'FAILED';
    },
    setDefaultStatus: (state) => {
      state.errors = null;
      state.status = 'IDLE';
    },
  },
});

export const { startLoading, loadingSuccess, setErrors, setDefaultStatus } =
  notificationInfoSlice.actions;

export default notificationInfoSlice.reducer;
