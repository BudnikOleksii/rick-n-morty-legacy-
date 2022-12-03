import { call, put, takeEvery, all } from 'redux-saga/effects';
import { IAuthResponse } from '../types/auth';
import { checkAuth, logIn, registration } from '../api/authService';
import {
  authError,
  loginStart,
  authSuccess,
  registrationStart,
  checkAuthStart,
} from '../features/userSlice';
import axios from 'axios';
import { setItemToLocalStorage } from '../helpers/localstorage-helpers';

function* loginWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(logIn, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (error) {
    localStorage.clear();
    if (axios.isAxiosError(error)) {
      yield put(authError(error.response?.data.errors));
    } else {
      yield put(authError(['Something went wrong']));
    }
  }
}

function* registrationWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(registration, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (error) {
    localStorage.clear();
    if (axios.isAxiosError(error)) {
      yield put(authError(error.response?.data.errors));
    } else {
      yield put(authError(['Something went wrong']));
    }
  }
}

function* refreshWorker() {
  try {
    const userData = (yield call(checkAuth)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (error) {
    localStorage.clear();
    if (axios.isAxiosError(error)) {
      yield put(authError(error.response?.data.errors));
    } else {
      yield put(authError(['Something went wrong']));
    }
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
