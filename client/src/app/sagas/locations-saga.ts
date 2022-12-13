import { call, put, takeEvery } from 'redux-saga/effects';
import {
  loadingSuccess,
  setErrors,
} from '../../features/notification-info/notification-info-slice';
import { getLocations } from '../../api/locations-service';
import { ILocation } from '../../types/location';
import { locationsLoadingStart, locationsSuccess } from '../../features/locations/locations-slice';

function* locationsWorker() {
  try {
    const locationsData = (yield call(getLocations)) as ILocation[];

    yield put(loadingSuccess());
    yield put(locationsSuccess(locationsData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* locationsSaga() {
  yield takeEvery(locationsLoadingStart.type, locationsWorker);
}

export default locationsSaga;
