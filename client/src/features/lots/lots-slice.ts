import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response';
import { ILot } from '../../types/lot';

interface LotsState {
  lots: Maybe<ILot[]>;
  lotsInfo: Maybe<IResponseInfo>;
}

const initialState: LotsState = {
  lots: null,
  lotsInfo: null,
};

const lotsSlice = createSlice({
  name: 'lots',
  initialState,
  reducers: {
    lotsLoadingStart: (state, action) => {},
    lotsSuccess: (state, action) => {
      state.lots = action.payload.results;
      state.lotsInfo = action.payload.info;
    },
    betForLot: (state, action) => {},
    betSuccess: (state, action) => {
      state.lots =
        state.lots?.map((lot) => (lot.id === action.payload.id ? action.payload : lot)) ||
        state.lots;
    },
  },
});

export const { lotsLoadingStart, lotsSuccess, betForLot, betSuccess } = lotsSlice.actions;

export default lotsSlice.reducer;
