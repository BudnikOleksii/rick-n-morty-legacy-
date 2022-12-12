import { call, put, takeEvery } from 'redux-saga/effects';
import { ICardResponse } from '../../types/card';
import {
  charactersLoadingStart,
  charactersSuccess,
} from '../../features/characters/characters-slice';
import { getCharacters } from '../../api/characters-service';
import {
  loadingSuccess,
  setErrors,
} from '../../features/notification-info/notification-info-slice';

function* charactersWorker({ payload }: ReturnType<typeof charactersLoadingStart>) {
  try {
    const charactersData = (yield call(getCharacters, payload.params)) as ICardResponse;

    yield put(loadingSuccess());
    yield put(charactersSuccess(charactersData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* charactersSaga() {
  yield takeEvery(charactersLoadingStart.type, charactersWorker);
}

export default charactersSaga;
