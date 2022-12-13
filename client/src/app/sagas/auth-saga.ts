import { call, put, takeEvery } from 'redux-saga/effects';
import { IAuthResponse } from '../../types/auth';
import { checkAuth, logIn, logout, registration } from '../../api/auth-service';
import {
  loginStart,
  authSuccess,
  registrationStart,
  checkAuthStart,
  logoutStart,
  setAuthDefaultState,
} from '../../features/auth/auth-slice';
import { setItemToLocalStorage } from '../../helpers/localstorage-helpers';
import {
  loadingSuccess,
  setErrors,
} from '../../features/notification-info/notification-info-slice';

function* loginWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(logIn, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(loadingSuccess());
    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(setErrors(errors));
  }
}

function* registrationWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(registration, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(loadingSuccess());
    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(setErrors(errors));
  }
}

function* refreshWorker() {
  try {
    const userData = (yield call(checkAuth)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(loadingSuccess());
    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(setErrors(errors));
  }
}

function* logoutWorker() {
  try {
    yield call(logout);

    localStorage.clear();

    yield put(loadingSuccess());
    yield put(setAuthDefaultState());
  } catch (errors) {
    yield put(setErrors(errors));
  }
}

function* authSaga() {
  yield takeEvery(loginStart.type, loginWorker);
  yield takeEvery(registrationStart.type, registrationWorker);
  yield takeEvery(checkAuthStart.type, refreshWorker);
  yield takeEvery(logoutStart.type, logoutWorker);
}

export default authSaga;
