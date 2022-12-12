import { createSlice } from '@reduxjs/toolkit';
import { IErrors } from '../../types/response';

interface NotificationInfo {
  isLoading: boolean;
  errors: IErrors;
}

const initialState: NotificationInfo = {
  isLoading: false,
  errors: null,
};

const notificationInfoSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.errors = null;
      state.isLoading = true;
    },
    loadingSuccess: (state) => {
      state.isLoading = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    removeErrors: (state) => {
      state.errors = null;
    },
  },
});

export const { startLoading, loadingSuccess, setErrors, removeErrors } =
  notificationInfoSlice.actions;

export default notificationInfoSlice.reducer;
