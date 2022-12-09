import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createSetStart,
  createSetSuccess,
  deleteSetStart,
  deleteSetSuccess,
  setsError,
  setsLoadingStart,
  setsSuccess,
  toggleCharacterInSetStart,
  toggleCharacterInSetSuccess,
} from '../../features/sets/sets-slice';
import { ISet, ISetsResponse } from '../../types/set';
import { createSet, deleteSet, getSets, toggleCharacterInSet } from '../../api/sets-service';

function* setsWorker({ payload }: ReturnType<typeof setsLoadingStart>) {
  try {
    const setsData = (yield call(getSets, payload.params)) as ISetsResponse;

    yield put(setsSuccess(setsData));
  } catch (errors) {
    yield put(setsError(errors));
  }
}

function* createSetWorker({ payload }: ReturnType<typeof createSetStart>) {
  try {
    const setData = (yield call(createSet, payload.name)) as ISet;

    yield put(createSetSuccess(setData));
  } catch (errors) {
    yield put(setsError(errors));
  }
}

function* deleteSetWorker({ payload }: ReturnType<typeof deleteSetStart>) {
  try {
    yield call(deleteSet, payload.id);

    yield put(deleteSetSuccess(payload.id));
  } catch (errors) {
    yield put(setsError(errors));
  }
}

function* toggleCharacterInSetWorker({ payload }: ReturnType<typeof toggleCharacterInSetStart>) {
  try {
    yield call(toggleCharacterInSet, payload.setId, payload.characterId);

    yield put(toggleCharacterInSetSuccess());
  } catch (errors) {
    yield put(setsError(errors));
  }
}

function* setsSaga() {
  yield takeEvery(setsLoadingStart.type, setsWorker);
  yield takeEvery(createSetStart.type, createSetWorker);
  yield takeEvery(deleteSetStart.type, deleteSetWorker);
  yield takeEvery(toggleCharacterInSetStart.type, toggleCharacterInSetWorker);
}

export default setsSaga;
