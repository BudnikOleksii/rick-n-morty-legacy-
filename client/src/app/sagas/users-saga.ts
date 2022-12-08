import { all, call, put, takeEvery } from 'redux-saga/effects';
import { addNewRole, getUsers } from '../../api/user-service';
import { IUserResponse, IUsersResponse } from '../../types/user';
import {
  addNewRoleStart,
  addNewRoleSuccess,
  usersError,
  usersLoadingStart,
  usersSuccess,
} from '../../features/users/users-slice';
import { instanceOfErrorResponse } from '../../types/response';

function* usersWorker({ payload }: ReturnType<typeof usersLoadingStart>) {
  try {
    const usersData = (yield call(getUsers, payload.params)) as IUsersResponse;

    if (instanceOfErrorResponse(usersData)) {
      throw usersData.errors;
    }

    yield put(usersSuccess(usersData));
  } catch (errors) {
    yield put(usersError(errors));
  }
}

function* addNewRoleWorker({ payload }: ReturnType<typeof usersLoadingStart>) {
  try {
    const userData = (yield call(addNewRole, payload.id, payload.role)) as IUserResponse;

    if (instanceOfErrorResponse(userData)) {
      throw userData.errors;
    }

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
