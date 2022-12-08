import { all, call, put, takeEvery } from 'redux-saga/effects';
import { addNewRole, getUsers } from '../../api/user-service';
import { IUser, IUsersResponse } from '../../types/user';
import {
  addNewRoleStart,
  addNewRoleSuccess,
  usersError,
  usersLoadingStart,
  usersSuccess,
} from '../../features/users/users-slice';

function* usersWorker({ payload }: ReturnType<typeof usersLoadingStart>) {
  try {
    const usersData = (yield call(getUsers, payload.params)) as IUsersResponse;

    yield put(usersSuccess(usersData));
  } catch (errors) {
    yield put(usersError(errors));
  }
}

function* addNewRoleWorker({ payload }: ReturnType<typeof usersLoadingStart>) {
  try {
    const userData = (yield call(addNewRole, payload.id, payload.role)) as IUser;

    yield put(addNewRoleSuccess(userData));
  } catch (errors) {
    yield put(usersError(errors));
  }
}

function* usersWatcher() {
  yield takeEvery(usersLoadingStart.type, usersWorker);
}

function* addNewRoleWatcher() {
  yield takeEvery(addNewRoleStart.type, addNewRoleWorker);
}

function* usersSaga() {
  yield all([call(usersWatcher), call(addNewRoleWatcher)]);
}

export default usersSaga;
