import { all } from 'redux-saga/effects';
import authSaga from './authSaga';

export default function* IndexSaga() {
  yield all([authSaga()]);
}
