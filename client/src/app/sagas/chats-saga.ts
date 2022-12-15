import { call, put, takeEvery } from 'redux-saga/effects';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import { chatsLoadingStart, chatsSuccess } from '../../features/chats/chats-slice';
import { getChats } from '../../api/chats-service';
import { IChatResponse } from '../../types/chat-messages';

function* chatsWorker({ payload }: ReturnType<typeof chatsLoadingStart>) {
  try {
    const chatsData = (yield call(getChats, payload.params)) as IChatResponse;

    yield put(chatsSuccess(chatsData));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(chatsLoadingStart.type));
  }
}

function* chatsSaga() {
  yield takeEvery(chatsLoadingStart.type, chatsWorker);
}

export default chatsSaga;
