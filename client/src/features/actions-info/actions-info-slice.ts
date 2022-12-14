import { createSlice } from '@reduxjs/toolkit';
import { IErrors } from '../../types/response';

interface ActionsInfo {
  errors: IErrors;
  actions: string[];
  successMessages: string[];
}

const initialState: ActionsInfo = {
  errors: null,
  actions: [],
  successMessages: [],
};

const actionsInfoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.actions.push(action.payload);
    },
    finishAction: (state, action) => {
      state.actions = state.actions.filter((act) => act !== action.payload);
    },
    setSuccessMessage: (state, action) => {
      state.successMessages.push(action.payload);
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultStatus: (state) => {
      state.errors = null;
      state.successMessages = [];
    },
  },
});

export const { registerAction, finishAction, setSuccessMessage, setErrors, setDefaultStatus } =
  actionsInfoSlice.actions;

export default actionsInfoSlice.reducer;
