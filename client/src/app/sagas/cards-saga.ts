import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserCards } from '../../api/user-service';
import { ICardResponse } from '../../types/card';
import {
  userCardsLoadingStart,
  cardsSuccess,
  cardsLoadingStart,
  createCardStart,
} from '../../features/cards/cards-slice';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import { createNewCard, getCards } from '../../api/cards-service';

function* cardsWorker({ payload }: ReturnType<typeof cardsLoadingStart>) {
  try {
    const cardsData = (yield call(getCards, payload.params)) as ICardResponse;

    yield put(cardsSuccess(cardsData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(cardsLoadingStart.type));
  }
}

function* userCardsWorker({ payload }: ReturnType<typeof userCardsLoadingStart>) {
  try {
    const cardsData = (yield call(getUserCards, payload.userId, payload.params)) as ICardResponse;

    yield put(cardsSuccess(cardsData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(userCardsLoadingStart.type));
  }
}

function* createCardWorker({ payload }: ReturnType<typeof createCardStart>) {
  try {
    yield call(createNewCard, payload.id);
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(createCardStart.type));
  }
}

function* cardsSaga() {
  yield takeEvery(cardsLoadingStart.type, cardsWorker);
  yield takeEvery(userCardsLoadingStart.type, userCardsWorker);
  yield takeEvery(createCardStart.type, createCardWorker);
}

export default cardsSaga;
