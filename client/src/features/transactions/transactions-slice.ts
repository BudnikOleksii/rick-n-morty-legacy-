import { createSlice, current } from '@reduxjs/toolkit';
import { Maybe } from '../../types/helper-types';
import { IResponseInfo } from '../../types/response';
import { ITransaction } from '../../types/transaction';

interface CharactersState {
  transactions: Maybe<ITransaction[]>;
  transactionsInfo: Maybe<IResponseInfo>;
}

const initialState: CharactersState = {
  transactions: null,
  transactionsInfo: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionsLoadingStart: (state, action) => {},
    transactionsSuccess: (state, action) => {
      state.transactions = action.payload.results;
      state.transactionsInfo = action.payload.info;
    },
    replenishBalanceStart: (state, action) => {},
    withdrawalStart: (state, action) => {},
    transactionSuccess: (state, action) => {
      const previousTransactions = current(state.transactions) || [];
      state.transactions = [action.payload, ...previousTransactions];
    },
  },
});

export const {
  transactionsLoadingStart,
  transactionsSuccess,
  replenishBalanceStart,
  withdrawalStart,
  transactionSuccess,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
