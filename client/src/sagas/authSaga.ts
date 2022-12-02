import { call, put, takeEvery } from 'redux-saga/effects';
import { ILogin, ILoginResponse } from '../types/auth';
import { logIn } from '../api/authService';
import { authError, authStart, authSuccess } from '../features/userSlice';
import axios from 'axios';

type payload = {
  payload: ILogin;
};

function* workLogIn({ payload }: payload) {
  try {
    const user = (yield call(logIn, payload)) as ILoginResponse;
    yield put(authSuccess(user));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(authError(error.response?.data.errors));
    } else {
      yield put(authError(['Something went wrong']));
    }
  }
}

function* userSaga() {
  // TODO find solution for TS
  // @ts-ignore
  yield takeEvery(authStart.type, workLogIn);
}

export default userSaga;
