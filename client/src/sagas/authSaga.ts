import { call, put, takeEvery } from 'redux-saga/effects';
import { ILoginResponse } from '../types/auth';
import { logIn } from '../api/authService';
import { authError, authStart, authSuccess } from '../features/userSlice';
import axios from 'axios';
import { setItemToLocalStorage } from '../helpers/localstorage-helpers';

function* workLogIn({ payload }: ReturnType<typeof authStart>) {
  try {
    const userData = (yield call(logIn, payload)) as ILoginResponse;

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

function* userSaga() {
  yield takeEvery(authStart.type, workLogIn);
}

export default userSaga;
