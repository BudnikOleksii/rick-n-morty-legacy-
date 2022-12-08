import { all, call, put, takeEvery } from 'redux-saga/effects';
import { instanceOfErrorResponse } from '../../types/response';
import { setsError, setsLoadingStart, setsSuccess } from '../../features/sets/sets-slice';
import { ISetResponse } from '../../types/set';
import { getSets } from '../../api/sets-service';

function* setsWorker({ payload }: ReturnType<typeof setsLoadingStart>) {
  try {
    const setsData = (yield call(getSets, payload.params)) as ISetResponse;

    if (instanceOfErrorResponse(setsData)) {
      throw setsData.errors;
    }

    yield put(setsSuccess(setsData));
  } catch (errors) {
    yield put(setsError(errors));
  }
}

function* setsWatcher() {
  yield takeEvery(setsLoadingStart.type, setsWorker);
}

function* setsSaga() {
  yield all([call(setsWatcher)]);
}

export default setsSaga;
