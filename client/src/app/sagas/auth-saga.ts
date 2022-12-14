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
  finishAction,
  setErrors,
  setSuccessMessage,
} from '../../features/actions-info/actions-info-slice';

function* loginWorker({ payload }: ReturnType<typeof loginStart>) {
  try {
    const userData = (yield call(logIn, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(setSuccessMessage(`Welcome ${userData.user.username}, you successfully logged in`));
    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(loginStart.type));
  }
}

function* registrationWorker({ payload }: ReturnType<typeof registrationStart>) {
  try {
    const userData = (yield call(registration, payload)) as IAuthResponse;

    setItemToLocalStorage('tokens', userData.tokens);
    setItemToLocalStorage('user', userData.user);

    yield put(setSuccessMessage(`Welcome ${userData.user.username}, you successfully registered`));
    yield put(authSuccess(userData));
  } catch (errors) {
    localStorage.clear();
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(registrationStart.type));
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
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(checkAuthStart.type));
  }
}

function* logoutWorker() {
  try {
    yield call(logout);

    localStorage.clear();

    yield put(setSuccessMessage(`Successfully logged out`));
    yield put(setAuthDefaultState());
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(logoutStart.type));
  }
}

function* authSaga() {
  yield takeEvery(loginStart.type, loginWorker);
  yield takeEvery(registrationStart.type, registrationWorker);
  yield takeEvery(checkAuthStart.type, refreshWorker);
  yield takeEvery(logoutStart.type, logoutWorker);
}

export default authSaga;
