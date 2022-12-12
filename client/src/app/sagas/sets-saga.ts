import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createSetStart,
  createSetSuccess,
  deleteSetStart,
  deleteSetSuccess,
  setsLoadingStart,
  setsSuccess,
  toggleCharacterInSetStart,
} from '../../features/sets/sets-slice';
import { ISet, ISetsResponse } from '../../types/set';
import { createSet, deleteSet, getSets, toggleCharacterInSet } from '../../api/sets-service';
import {
  loadingSuccess,
  setErrors,
} from '../../features/notification-info/notification-info-slice';

function* setsWorker({ payload }: ReturnType<typeof setsLoadingStart>) {
  try {
    const setsData = (yield call(getSets, payload.params)) as ISetsResponse;

    yield put(loadingSuccess());
    yield put(setsSuccess(setsData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* createSetWorker({ payload }: ReturnType<typeof createSetStart>) {
  try {
    const setData = (yield call(createSet, payload.name)) as ISet;

    yield put(loadingSuccess());
    yield put(createSetSuccess(setData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* deleteSetWorker({ payload }: ReturnType<typeof deleteSetStart>) {
  try {
    yield call(deleteSet, payload.id);

    yield put(loadingSuccess());
    yield put(deleteSetSuccess(payload.id));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* toggleCharacterInSetWorker({ payload }: ReturnType<typeof toggleCharacterInSetStart>) {
  try {
    yield call(toggleCharacterInSet, payload.setId, payload.characterId);

    yield put(loadingSuccess());
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* setsSaga() {
  yield takeEvery(setsLoadingStart.type, setsWorker);
  yield takeEvery(createSetStart.type, createSetWorker);
  yield takeEvery(deleteSetStart.type, deleteSetWorker);
  yield takeEvery(toggleCharacterInSetStart.type, toggleCharacterInSetWorker);
}

export default setsSaga;
