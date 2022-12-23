import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserTransactions } from '../../api/user-service';
import {
  finishAction,
  setErrors,
  setSuccessMessage,
} from '../../features/actions-info/actions-info-slice';
import {
  replenishBalanceStart,
  transactionsLoadingStart,
  transactionsSuccess,
  transactionSuccess,
} from '../../features/transactions/transactions-slice';
import { ITransactionResponse } from '../../types/transaction';
import { replenishBalance } from '../../api/payments-service';
import { IPaymentResponse } from '../../types/payment-types';
import { updateUserInfo } from '../../features/auth/auth-slice';

function* transactionsWorker({ payload }: ReturnType<typeof transactionsLoadingStart>) {
  try {
    const transactionsData = (yield call(
      getUserTransactions,
      payload.userId,
      payload.params
    )) as ITransactionResponse;

    yield put(transactionsSuccess(transactionsData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(transactionsLoadingStart.type));
  }
}

function* replenishBalanceWorker({ payload }: ReturnType<typeof replenishBalanceStart>) {
  try {
    const transactionResponse = (yield call(replenishBalance, payload)) as IPaymentResponse;
    const successMessage = `You balance was successfully refilled for ${transactionResponse.transaction.amount}`;

    yield put(updateUserInfo(transactionResponse.user));
    yield put(transactionSuccess(transactionResponse.transaction));
    yield put(setSuccessMessage(successMessage));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(replenishBalanceStart.type));
  }
}

function* transactionsSaga() {
  yield takeEvery(transactionsLoadingStart.type, transactionsWorker);
  yield takeEvery(replenishBalanceStart.type, replenishBalanceWorker);
}

export default transactionsSaga;
