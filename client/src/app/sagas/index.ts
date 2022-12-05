import { all } from 'redux-saga/effects';
import authSaga from './auth-saga';
import cardsSaga from './cards-saga';

export default function* IndexSaga() {
  yield all([authSaga(), cardsSaga()]);
}
