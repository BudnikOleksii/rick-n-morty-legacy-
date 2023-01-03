import { call, put, takeEvery } from 'redux-saga/effects';
import {
  characterLoadingStart,
  charactersLoadingStart,
  charactersSuccess,
  characterSuccess,
} from '../../features/characters/characters-slice';
import { getCharacterById, getCharacters } from '../../api/characters-service';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import { ICharacter, ICharactersResponse } from '../../types/character';

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

function* characterWorker({ payload }: ReturnType<typeof characterLoadingStart>) {
  try {
    const charactersData = (yield call(getCharacterById, payload.id)) as ICharacter;

    yield put(characterSuccess(charactersData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(characterLoadingStart.type));
  }
}

function* charactersSaga() {
  yield takeEvery(charactersLoadingStart.type, charactersWorker);
  yield takeEvery(characterLoadingStart.type, characterWorker);
}

export default charactersSaga;
