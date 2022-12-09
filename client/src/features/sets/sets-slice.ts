import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response';
import { ISet } from '../../types/set';

interface SetsState {
  sets: Maybe<ISet[]>;
  setsInfo: Maybe<IResponseInfo>;
}

const initialState: SetsState = {
  sets: null,
  setsInfo: null,
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
  createSetStart,
  createSetSuccess,
  deleteSetStart,
  deleteSetSuccess,
  toggleCharacterInSetStart,
} = setsSlice.actions;

export default setsSlice.reducer;
