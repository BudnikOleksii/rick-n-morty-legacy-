import { call, put, takeEvery } from 'redux-saga/effects';
import { IAuthResponse } from '../../types/auth';
import { checkAuth, logIn, logout, registration } from '../../api/auth-service';
import {
  authError,
  loginStart,
  authSuccess,
  registrationStart,
  checkAuthStart,
  logoutStart,
  setAuthDefaultState,
} from '../../features/auth/auth-slice';
import { setItemToLocalStorage } from '../../helpers/localstorage-helpers';

function* loginWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(logIn, payload)) as IAuthResponse;

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

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(authError(errors));
  }
}

function* logoutWorker() {
  try {
    yield call(logout);

    localStorage.clear();

    yield put(setAuthDefaultState());
  } catch (errors) {
    yield put(authError(errors));
  }
}

function* authSaga() {
  yield takeEvery(loginStart.type, loginWorker);
  yield takeEvery(registrationStart.type, registrationWorker);
  yield takeEvery(checkAuthStart.type, refreshWorker);
  yield takeEvery(logoutStart.type, logoutWorker);
}

export default authSaga;
