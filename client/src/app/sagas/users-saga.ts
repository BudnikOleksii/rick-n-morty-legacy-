import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getUsers } from '../../api/user-service';
import { IUserResponse } from '../../types/user';
import { usersError, usersLoadingStart, usersSuccess } from '../../features/users/users-slice';

function* usersWorker({ payload }: ReturnType<typeof usersLoadingStart>) {
  try {
    const usersData = (yield call(getUsers, payload.params)) as IUserResponse;

    if (usersData.errors) {
      throw usersData.errors;
    }

    yield put(usersSuccess(usersData));
  } catch (errors) {
    yield put(usersError(errors));
  }
}

function* usersWatcher() {
  yield takeEvery(usersLoadingStart.type, usersWorker);
}

function* usersSaga() {
  yield all([call(usersWatcher)]);
}

export default usersSaga;
