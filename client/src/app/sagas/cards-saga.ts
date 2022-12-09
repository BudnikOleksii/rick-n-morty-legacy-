import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserCards } from '../../api/user-service';
import { ICardResponse } from '../../types/card';
import { cardsError, cardsLoadingStart, cardsSuccess } from '../../features/cards/cards-slice';

function* cardsWorker({ payload }: ReturnType<typeof cardsLoadingStart>) {
  try {
    const cardsData = (yield call(getUserCards, payload.userId, payload.params)) as ICardResponse;

    yield put(cardsSuccess(cardsData));
  } catch (errors) {
    yield put(cardsError(errors));
  }
}

function* cardsSaga() {
  yield takeEvery(cardsLoadingStart.type, cardsWorker);
}

export default cardsSaga;
