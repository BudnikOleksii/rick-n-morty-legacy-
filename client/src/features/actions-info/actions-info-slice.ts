import { createSlice } from '@reduxjs/toolkit';
import { IErrors } from '../../types/response';

interface ActionsInfo {
  errors: IErrors;
  actions: string[];
}

const initialState: ActionsInfo = {
  errors: null,
  actions: [],
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
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultStatus: (state) => {
      state.errors = null;
    },
  },
});

export const { registerAction, finishAction, setErrors, setDefaultStatus } =
  actionsInfoSlice.actions;

export default actionsInfoSlice.reducer;
