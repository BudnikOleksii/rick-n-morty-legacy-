import { call, put, takeEvery } from 'redux-saga/effects';
import { IAuthResponse } from '../types/auth';
import { logIn } from '../api/authService';
import { authError, loginStart, authSuccess } from '../features/userSlice';
import axios from 'axios';
import { setItemToLocalStorage } from '../helpers/localstorage-helpers';

function* workLogIn({ payload }: ReturnType<typeof loginStart>) {
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

function* loginSaga() {
  yield takeEvery(loginStart.type, workLogIn);
}

export default loginSaga;
