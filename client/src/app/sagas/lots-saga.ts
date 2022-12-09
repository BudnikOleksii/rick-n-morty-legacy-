import { call, put, takeEvery } from 'redux-saga/effects';
import { lotsLoadingStart, lotsSuccess } from '../../features/lots/lots-slice';
import { ILotResponse } from '../../types/lot';
import { getLots } from '../../api/lots-service';
import {
  loadingSuccess,
  setErrors,
} from '../../features/notification-info/notification-info-slice';

function* lotsWorker({ payload }: ReturnType<typeof lotsLoadingStart>) {
  try {
    const lotsData = (yield call(getLots, payload.params)) as ILotResponse;

    yield put(loadingSuccess());
    yield put(lotsSuccess(lotsData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* lotsSaga() {
  yield takeEvery(lotsLoadingStart.type, lotsWorker);
}

export default lotsSaga;
