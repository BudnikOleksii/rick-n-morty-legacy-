import { call, put, takeEvery } from 'redux-saga/effects';
import { ICardResponse } from '../../types/card';
import {
  charactersError,
  charactersLoadingStart,
  charactersSuccess,
} from '../../features/characters/characters-slice';
import { getCharacters } from '../../api/characters-service';

function* charactersWorker({ payload }: ReturnType<typeof charactersLoadingStart>) {
  try {
    const charactersData = (yield call(getCharacters, payload.params)) as ICardResponse;

    yield put(charactersSuccess(charactersData));
  } catch (errors) {
    yield put(charactersError(errors));
  }
}

function* charactersSaga() {
  yield takeEvery(charactersLoadingStart.type, charactersWorker);
}

export default charactersSaga;
