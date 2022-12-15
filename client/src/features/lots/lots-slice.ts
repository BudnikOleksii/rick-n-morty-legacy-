import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { ILot, IPricesRange } from '../../types/lot';

interface LotsState {
  lots: Maybe<ILot[]>;
  lotsInfo: Maybe<IResponseInfo>;
  pricesRange: IPricesRange;
}

const initialState: LotsState = {
  lots: null,
  lotsInfo: null,
  pricesRange: {
    minPrice: 0,
    maxPrice: 1000,
  },
};

const lotsSlice = createSlice({
  name: 'lots',
  initialState,
  reducers: {
    lotsLoadingStart: (state, action) => {},
    lotsSuccess: (state, action) => {
      state.lots = action.payload.results;
      state.lotsInfo = action.payload.info;
      state.pricesRange = action.payload.pricesRange;
    },
    betForLot: (state, action) => {},
    betSuccess: (state, action) => {
      state.lots =
        state.lots?.map((lot) => (lot.id === action.payload.id ? action.payload : lot)) ||
        state.lots;
    },
    createNewLot: (state, action) => {},
  },
});

export const { lotsLoadingStart, lotsSuccess, betForLot, betSuccess, createNewLot } =
  lotsSlice.actions;

export default lotsSlice.reducer;
