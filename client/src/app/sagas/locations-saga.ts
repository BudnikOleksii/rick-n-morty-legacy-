import { call, put, takeEvery } from 'redux-saga/effects';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import { getLocations } from '../../api/locations-service';
import { ILocation } from '../../types/location';
import { locationsLoadingStart, locationsSuccess } from '../../features/locations/locations-slice';

function* locationsWorker() {
  try {
    const locationsData = (yield call(getLocations)) as ILocation[];

    yield put(locationsSuccess(locationsData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(locationsLoadingStart.type));
  }
}

function* locationsSaga() {
  yield takeEvery(locationsLoadingStart.type, locationsWorker);
}

export default locationsSaga;
