import { call, put, takeEvery } from 'redux-saga/effects';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import { createNewMessage, getChatById, getChatMessages } from '../../api/chats-service';
import { IChat, IMessage, IMessagesResponse } from '../../types/chat-messages';
import {
  createMessageStart,
  messagesLoadingStart,
  messagesSuccess,
} from '../../features/messages/messages-slice';

function* messagesWorker({ payload }: ReturnType<typeof messagesLoadingStart>) {
  try {
    const messagesData = (yield call(
      getChatMessages,
      payload.id,
      payload.params
    )) as IMessagesResponse;
    const chat = (yield call(getChatById, payload.id)) as IChat;

    yield put(
      messagesSuccess({
        ...messagesData,
        chat,
      })
    );
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(messagesLoadingStart.type));
  }
}

function* createMessageWorker({ payload }: ReturnType<typeof createMessageStart>) {
  try {
    yield call(createNewMessage, payload.chatId, payload.body);
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(createMessageStart.type));
  }
}

function* messagesSaga() {
  yield takeEvery(messagesLoadingStart.type, messagesWorker);
  yield takeEvery(createMessageStart.type, createMessageWorker);
}

export default messagesSaga;
