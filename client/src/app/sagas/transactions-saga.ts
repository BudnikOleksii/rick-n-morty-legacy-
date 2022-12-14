import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserTransactions } from '../../api/user-service';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
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

    yield put(transactionsSuccess(cardsData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(transactionsLoadingStart.type));
  }
}

function* transactionsSaga() {
  yield takeEvery(transactionsLoadingStart.type, transactionsWorker);
}

export default transactionsSaga;
