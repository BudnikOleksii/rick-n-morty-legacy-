import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserCards } from '../../api/user-service';
import { ICardResponse } from '../../types/card';
import {
  userCardsLoadingStart,
  cardsSuccess,
  cardsLoadingStart,
} from '../../features/cards/cards-slice';
import {
  loadingSuccess,
  setErrors,
} from '../../features/notification-info/notification-info-slice';
import { getCards } from '../../api/cards-service';

function* cardsWorker({ payload }: ReturnType<typeof cardsLoadingStart>) {
  try {
    const cardsData = (yield call(getCards, payload.params)) as ICardResponse;

    yield put(loadingSuccess());
    yield put(cardsSuccess(cardsData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* userCardsWorker({ payload }: ReturnType<typeof userCardsLoadingStart>) {
  try {
    const cardsData = (yield call(getUserCards, payload.userId, payload.params)) as ICardResponse;

    yield put(loadingSuccess());
    yield put(cardsSuccess(cardsData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* cardsSaga() {
  yield takeEvery(cardsLoadingStart.type, cardsWorker);
  yield takeEvery(userCardsLoadingStart.type, userCardsWorker);
}

export default cardsSaga;
