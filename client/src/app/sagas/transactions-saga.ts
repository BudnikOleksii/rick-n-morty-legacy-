import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserTransactions } from '../../api/user-service';
import {
  loadingSuccess,
  setErrors,
} from '../../features/notification-info/notification-info-slice';
import {
  transactionsLoadingStart,
  transactionsSuccess,
} from '../../features/transactions/transactions-slice';
import { ITransactionResponse } from '../../types/transaction';

function* transactionsWorker({ payload }: ReturnType<typeof transactionsLoadingStart>) {
  try {
    const cardsData = (yield call(
      getUserTransactions,
      payload.userId,
      payload.params
    )) as ITransactionResponse;

    yield put(loadingSuccess());
    yield put(transactionsSuccess(cardsData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* transactionsSaga() {
  yield takeEvery(transactionsLoadingStart.type, transactionsWorker);
}

export default transactionsSaga;
