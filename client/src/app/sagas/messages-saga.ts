import { call, put, takeEvery } from 'redux-saga/effects';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import {
  createNewMessage,
  deleteMessage,
  editMessage,
  getChatById,
  getChatMessages,
} from '../../api/chats-service';
import { IChat, IMessage, IMessagesResponse } from '../../types/chat-messages';
import {
  createMessageStart,
  deleteMessageStart,
  editMessageStart,
  messagesLoadingStart,
  messagesSuccess,
} from '../../features/messages/messages-slice';
import { socket } from '../../api/socket-api';
import { SOCKET_EVENTS } from '../../constants';

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
    const message = (yield call(createNewMessage, payload.chatId, payload.body)) as IMessage;
    socket.emit(SOCKET_EVENTS.send, message);
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(createMessageStart.type));
  }
}

function* editMessageWorker({ payload }: ReturnType<typeof editMessageStart>) {
  try {
    const message = (yield call(editMessage, payload)) as IMessage;

    socket.emit(SOCKET_EVENTS.send, message);
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(editMessageStart.type));
  }
}

function* deleteMessageWorker({ payload }: ReturnType<typeof deleteMessageStart>) {
  try {
    const message = (yield call(deleteMessage, payload)) as IMessage;

    socket.emit(SOCKET_EVENTS.send, message);
  } catch (errors) {
    yield put(setErrors(errors));
  } finally {
    yield put(finishAction(deleteMessageStart.type));
  }
}

function* messagesSaga() {
  yield takeEvery(messagesLoadingStart.type, messagesWorker);
  yield takeEvery(createMessageStart.type, createMessageWorker);
  yield takeEvery(editMessageStart.type, editMessageWorker);
  yield takeEvery(deleteMessageStart.type, deleteMessageWorker);
}

export default messagesSaga;
