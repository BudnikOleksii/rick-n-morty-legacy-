import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { ICard } from '../../types/card';

interface CardsState {
  cards: Maybe<ICard[]>;
  cardsInfo: Maybe<IResponseInfo>;
}

const initialState: CardsState = {
  cards: null,
  cardsInfo: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    userCardsLoadingStart: (state, action) => {},
    cardsLoadingStart: (state, action) => {},
    cardsSuccess: (state, action) => {
      state.cards = action.payload.results;
      state.cardsInfo = action.payload.info;
    },
  },
});

export const { cardsLoadingStart, userCardsLoadingStart, cardsSuccess } = cardsSlice.actions;

export default cardsSlice.reducer;
