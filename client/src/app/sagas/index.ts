import { all } from 'redux-saga/effects';
import authSaga from './auth-saga';
import cardsSaga from './cards-saga';
import usersSaga from './users-saga';

export default function* IndexSaga() {
  yield all([authSaga(), cardsSaga(), usersSaga()]);
}
