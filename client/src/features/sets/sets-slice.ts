import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { ISet, ISetFullInfo } from '../../types/set';

interface SetsState {
  sets: Maybe<ISet[]>;
  setsInfo: Maybe<IResponseInfo>;
  selectedSet: Maybe<ISetFullInfo>;
}

const initialState: SetsState = {
  sets: null,
  setsInfo: null,
  selectedSet: null,
};

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    setsLoadingStart: (state, action) => {},
    setsSuccess: (state, action) => {
      state.sets = action.payload.results;
      state.setsInfo = action.payload.info;
    },
    setLoadingStart: (state, action) => {},
    setSuccess: (state, action) => {
      state.selectedSet = action.payload;
    },
    createSetStart: (state, action) => {},
    createSetSuccess: (state, action) => {
      state.sets?.push(action.payload);
    },
    deleteSetStart: (state, action) => {},
    deleteSetSuccess: (state, action) => {
      state.sets = state.sets?.filter((set) => set.id !== action.payload) || null;
    },
    toggleCharacterInSetStart: (state, action) => {},
  },
});

export const {
  setsLoadingStart,
  setsSuccess,
  setLoadingStart,
  setSuccess,
  createSetStart,
  createSetSuccess,
  deleteSetStart,
  deleteSetSuccess,
  toggleCharacterInSetStart,
} = setsSlice.actions;

export default setsSlice.reducer;
