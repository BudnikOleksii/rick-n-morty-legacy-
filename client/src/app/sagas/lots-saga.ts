import { call, put, takeEvery } from 'redux-saga/effects';
import { lotsError, lotsLoadingStart, lotsSuccess } from '../../features/lots/lots-slice';
import { ILotResponse } from '../../types/lot';
import { getLots } from '../../api/lots-service';

function* lotsWorker({ payload }: ReturnType<typeof lotsLoadingStart>) {
  try {
    const lotsData = (yield call(getLots, payload.params)) as ILotResponse;

    yield put(lotsSuccess(lotsData));
  } catch (errors) {
    yield put(lotsError(errors));
  }
}

function* lotsSaga() {
  yield takeEvery(lotsLoadingStart.type, lotsWorker);
}

export default lotsSaga;
