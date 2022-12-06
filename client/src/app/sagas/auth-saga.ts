import { call, put, takeEvery, all } from 'redux-saga/effects';
import { IAuthResponse } from '../../types/auth';
import { checkAuth, logIn, registration } from '../../api/auth-service';
import {
  authError,
  loginStart,
  authSuccess,
  registrationStart,
  checkAuthStart,
} from '../../features/auth/auth-slice';
import { setItemToLocalStorage } from '../../helpers/localstorage-helpers';
import { instanceOfErrorResponse } from '../../types/response';

function* loginWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(logIn, payload)) as IAuthResponse;

    if (instanceOfErrorResponse(userData)) {
      throw userData.errors;
    }

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(authError(errors));
  }
}

function* registrationWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(registration, payload)) as IAuthResponse;

    if (instanceOfErrorResponse(userData)) {
      throw userData.errors;
    }

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(authError(errors));
  }
}

function* refreshWorker() {
  try {
    const userData = (yield call(checkAuth)) as IAuthResponse;

    if (instanceOfErrorResponse(userData)) {
      throw userData.errors;
    }

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(authError(errors));
  }
}

function* loginWatcher() {
  yield takeEvery(loginStart.type, loginWorker);
}

function* registrationWatcher() {
  yield takeEvery(registrationStart.type, registrationWorker);
}

function* refreshWatcher() {
  yield takeEvery(checkAuthStart.type, refreshWorker);
}

function* authSaga() {
  yield all([call(loginWatcher), call(registrationWatcher), call(refreshWatcher)]);
}

export default authSaga;
