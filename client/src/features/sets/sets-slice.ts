import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response';
import { ISet } from '../../types/set';

interface SetsState {
  sets: Maybe<ISet[]>;
  setsInfo: Maybe<IResponseInfo>;
  setsIsloading: boolean;
  setsErrors: Maybe<string[]>;
}

const initialState: SetsState = {
  sets: null,
  setsInfo: null,
  setsIsloading: false,
  setsErrors: null,
};

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    setsLoadingStart: (state, action) => {
      state.setsIsloading = true;
      state.setsErrors = null;
    },
    setsSuccess: (state, action) => {
      state.setsIsloading = false;
      state.sets = action.payload.results;
      state.setsInfo = action.payload.info;
    },
    setsError: (state, action) => {
      state.setsIsloading = false;
      state.setsErrors = action.payload;
    },
    setsRemoveErrors: (state) => {
      state.setsErrors = null;
    },
    createSetStart: (state, action) => {
      state.setsIsloading = true;
      state.setsErrors = null;
    },
    createSetSuccess: (state, action) => {
      state.setsIsloading = false;
      state.sets?.push(action.payload);
    },
    deleteSetStart: (state, action) => {
      state.setsIsloading = true;
      state.setsErrors = null;
    },
    deleteSetSuccess: (state, action) => {
      state.setsIsloading = false;
      state.sets = state.sets?.filter((set) => set.id !== action.payload) || null;
    },
  },
});

export const {
  setsLoadingStart,
  setsSuccess,
  setsError,
  setsRemoveErrors,
  createSetStart,
  createSetSuccess,
  deleteSetStart,
  deleteSetSuccess,
} = setsSlice.actions;

export default setsSlice.reducer;
