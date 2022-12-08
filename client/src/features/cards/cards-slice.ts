import { Maybe } from '../../types/maybe';
import { createSlice } from '@reduxjs/toolkit';
import { IResponseInfo } from '../../types/response';
import { ICard } from '../../types/card';

interface CardsState {
  cards: Maybe<ICard[]>;
  cardsInfo: Maybe<IResponseInfo>;
  cardsIsloading: boolean;
  cardsErrors: Maybe<string[]>;
}

const initialState: CardsState = {
  cards: null,
  cardsInfo: null,
  cardsIsloading: false,
  cardsErrors: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    cardsLoadingStart: (state, action) => {
      state.cardsIsloading = true;
      state.cardsErrors = null;
    },
    cardsSuccess: (state, action) => {
      state.cardsIsloading = false;
      state.cards = action.payload.results;
      state.cardsInfo = action.payload.info;
    },
    cardsError: (state, action) => {
      state.cardsIsloading = false;
      state.cardsErrors = action.payload;
    },
    cardsRemoveErrors: (state) => {
      state.cardsErrors = null;
    },
  },
});

export const { cardsLoadingStart, cardsSuccess, cardsError, cardsRemoveErrors } =
  cardsSlice.actions;

export default cardsSlice.reducer;
