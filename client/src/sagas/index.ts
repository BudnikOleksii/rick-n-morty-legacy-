import { all } from 'redux-saga/effects';
import userSaga from './authSaga';

export default function* IndexSaga() {
  yield all([userSaga()]);
}
