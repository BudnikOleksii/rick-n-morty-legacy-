import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getUserCards } from '../../api/user-service';
import { ICardResponse } from '../../types/card';
import { cardsError, cardsLoadingStart, cardsSuccess } from '../../features/cards/cards-slice';

function* cardsWorker({ payload }: ReturnType<typeof cardsLoadingStart>) {
  try {
    const cardsData = (yield call(getUserCards, payload.userId, payload.params)) as ICardResponse;

    if (cardsData.errors) {
      throw cardsData.errors;
    }

    yield put(cardsSuccess(cardsData));
  } catch (errors) {
    yield put(cardsError(errors));
  }
}

function* cardsWatcher() {
  yield takeEvery(cardsLoadingStart.type, cardsWorker);
}

function* cardsSaga() {
  yield all([call(cardsWatcher)]);
}

export default cardsSaga;
