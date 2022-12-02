import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';

export default function* IndexSaga() {
  yield all([loginSaga(), registrationSaga()]);
}
