import { call, put, takeEvery, all } from 'redux-saga/effects';
import { IAuthResponse } from '../types/auth';
import { logIn, registration } from '../api/authService';
import { authError, loginStart, authSuccess, registrationStart } from '../features/userSlice';
import axios from 'axios';
import { setItemToLocalStorage } from '../helpers/localstorage-helpers';

function* workLogin({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(logIn, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(authError(error.response?.data.errors));
    } else {
      yield put(authError(['Something went wrong']));
    }
  }
}

function* workRegistration({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(registration, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(authSuccess(userData));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(authError(error.response?.data.errors));
    } else {
      yield put(authError(['Something went wrong']));
    }
  }
}

function* loginSaga() {
  yield takeEvery(loginStart.type, workLogin);
}

function* registrationSaga() {
  yield takeEvery(registrationStart.type, workRegistration);
}

function* authSaga() {
  yield all([call(loginSaga), call(registrationSaga)]);
}

export default authSaga;
