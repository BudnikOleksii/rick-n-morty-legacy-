import { call, put, takeEvery } from 'redux-saga/effects';
import { addNewRole, getUsers } from '../../api/user-service';
import { IUser, IUsersResponse } from '../../types/user';
import {
  addNewRoleStart,
  addNewRoleSuccess,
  usersLoadingStart,
  usersSuccess,
} from '../../features/users/users-slice';
import { finishAction, setErrors } from '../../features/notification-info/notification-info-slice';

function* usersWorker({ payload }: ReturnType<typeof usersLoadingStart>) {
  try {
    const usersData = (yield call(getUsers, payload.params)) as IUsersResponse;

    yield put(finishAction(usersLoadingStart.type));
    yield put(usersSuccess(usersData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* addNewRoleWorker({ payload }: ReturnType<typeof addNewRoleStart>) {
  try {
    const userData = (yield call(addNewRole, payload.id, payload.role)) as IUser;

    yield put(finishAction(addNewRoleStart.type));
    yield put(addNewRoleSuccess(userData));
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* usersSaga() {
  yield takeEvery(usersLoadingStart.type, usersWorker);
  yield takeEvery(addNewRoleStart.type, addNewRoleWorker);
}

export default usersSaga;
