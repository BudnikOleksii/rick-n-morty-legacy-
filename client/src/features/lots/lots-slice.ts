import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response';
import { ILot } from '../../types/lot';

interface LotsState {
  lots: Maybe<ILot[]>;
  lotsInfo: Maybe<IResponseInfo>;
  lotsIsloading: boolean;
  lotsErrors: Maybe<string[]>;
}

const initialState: LotsState = {
  lots: null,
  lotsInfo: null,
  lotsIsloading: false,
  lotsErrors: null,
};

const lotsSlice = createSlice({
  name: 'lots',
  initialState,
  reducers: {
    lotsLoadingStart: (state, action) => {
      state.lotsIsloading = true;
      state.lotsErrors = null;
    },
    lotsSuccess: (state, action) => {
      state.lotsIsloading = false;
      state.lots = action.payload.results;
      state.lotsInfo = action.payload.info;
    },
    lotsError: (state, action) => {
      state.lotsIsloading = false;
      state.lotsErrors = action.payload;
    },
    lotsRemoveErrors: (state) => {
      state.lotsErrors = null;
    },
  },
});

export const { lotsLoadingStart, lotsSuccess, lotsError, lotsRemoveErrors } = lotsSlice.actions;

export default lotsSlice.reducer;
