import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createSetStart,
  createSetSuccess,
  deleteSetStart,
  deleteSetSuccess,
  setLoadingStart,
  setsLoadingStart,
  setsSuccess,
  setSuccess,
  toggleCharacterInSetStart,
} from '../../features/sets/sets-slice';
import { ISet, ISetFullInfo, ISetsResponse } from '../../types/set';
import {
  createSet,
  deleteSet,
  getSetById,
  getSets,
  toggleCharacterInSet,
} from '../../api/sets-service';
import {
  finishAction,
  setErrors,
  setSuccessMessage,
} from '../../features/actions-info/actions-info-slice';

function* setsWorker({ payload }: ReturnType<typeof setsLoadingStart>) {
  try {
    const setsData = (yield call(getSets, payload.params)) as ISetsResponse;

    yield put(setsSuccess(setsData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(setsLoadingStart.type));
  }
}

function* setWorker({ payload }: ReturnType<typeof setLoadingStart>) {
  try {
    const set = (yield call(getSetById, payload.id)) as ISetFullInfo;

    yield put(setSuccess(set));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(setLoadingStart.type));
  }
}

function* createSetWorker({ payload }: ReturnType<typeof createSetStart>) {
  try {
    const setData = (yield call(createSet, payload.name)) as ISet;

    yield put(createSetSuccess(setData));
    yield put(setSuccessMessage(`Set ${setData.name} was successfully created`));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(createSetStart.type));
  }
}

function* deleteSetWorker({ payload }: ReturnType<typeof deleteSetStart>) {
  try {
    yield call(deleteSet, payload.id);

    yield put(setSuccessMessage(`Set was successfully deleted`));
    yield put(deleteSetSuccess(payload.id));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(deleteSetStart.type));
  }
}

function* toggleCharacterInSetWorker({ payload }: ReturnType<typeof toggleCharacterInSetStart>) {
  try {
    yield call(toggleCharacterInSet, payload.setId, payload.characterId);

    yield put(setSuccessMessage('Character was successfully toggled in set'));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(toggleCharacterInSetStart.type));
  }
}

function* setsSaga() {
  yield takeEvery(setsLoadingStart.type, setsWorker);
  yield takeEvery(setLoadingStart.type, setWorker);
  yield takeEvery(createSetStart.type, createSetWorker);
  yield takeEvery(deleteSetStart.type, deleteSetWorker);
  yield takeEvery(toggleCharacterInSetStart.type, toggleCharacterInSetWorker);
}

export default setsSaga;
