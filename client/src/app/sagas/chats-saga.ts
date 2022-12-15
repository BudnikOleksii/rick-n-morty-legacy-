import { call, put, takeEvery } from 'redux-saga/effects';
import {
  finishAction,
  setErrors,
  setSuccessMessage,
} from '../../features/actions-info/actions-info-slice';
import {
  chatsLoadingStart,
  chatsSuccess,
  toggleUserInChatStart,
} from '../../features/chats/chats-slice';
import { getChats, toggleUserInChat } from '../../api/chats-service';
import { IChat, IChatResponse } from '../../types/chat-messages';
import { updateChatInfo } from '../../features/messages/messages-slice';

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

function* toggleUserInChatWorker({ payload }: ReturnType<typeof toggleUserInChatStart>) {
  try {
    const chat = (yield call(toggleUserInChat, payload.chatId, payload.userId)) as IChat;

    yield put(updateChatInfo(chat));
    yield put(setSuccessMessage('User was successfully toggled in chat'));
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(toggleUserInChatStart.type));
  }
}

function* chatsSaga() {
  yield takeEvery(chatsLoadingStart.type, chatsWorker);
  yield takeEvery(toggleUserInChatStart.type, toggleUserInChatWorker);
}

export default chatsSaga;
