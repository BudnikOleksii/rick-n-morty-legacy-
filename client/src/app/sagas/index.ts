import { all } from 'redux-saga/effects';
import authSaga from './auth-saga';
import cardsSaga from './cards-saga';
import usersSaga from './users-saga';
import setsSaga from './sets-saga';
import charactersSaga from './characters-saga';
import lotsSaga from './lots-saga';
import transactionsSaga from './transactions-saga';
import locationsSaga from './locations-saga';
import chatsSaga from './chats-saga';
import messagesSaga from './messages-saga';

export default function* IndexSaga() {
  yield all([
    authSaga(),
    cardsSaga(),
    usersSaga(),
    setsSaga(),
    charactersSaga(),
    lotsSaga(),
    transactionsSaga(),
    locationsSaga(),
    chatsSaga(),
    messagesSaga(),
  ]);
}
