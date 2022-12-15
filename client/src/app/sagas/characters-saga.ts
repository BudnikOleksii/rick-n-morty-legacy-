import { call, put, takeEvery } from 'redux-saga/effects';
import {
  charactersLoadingStart,
  charactersSuccess,
} from '../../features/characters/characters-slice';
import { getCharacters } from '../../api/characters-service';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import { ICharactersResponse } from '../../types/character';

function* charactersWorker({ payload }: ReturnType<typeof charactersLoadingStart>) {
  try {
    const charactersData = (yield call(getCharacters, payload.params)) as ICharactersResponse;

    yield put(charactersSuccess(charactersData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(charactersLoadingStart.type));
  }
}

function* charactersSaga() {
  yield takeEvery(charactersLoadingStart.type, charactersWorker);
}

export default charactersSaga;
