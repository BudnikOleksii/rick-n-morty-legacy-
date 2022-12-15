import { call, put, takeEvery } from 'redux-saga/effects';
import { finishAction, setErrors } from '../../features/actions-info/actions-info-slice';
import { getChatById, getChatMessages } from '../../api/chats-service';
import { IChat, IMessagesResponse } from '../../types/chat-messages';
import { messagesLoadingStart, messagesSuccess } from '../../features/messages/messages-slice';

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

function* messagesSaga() {
  yield takeEvery(messagesLoadingStart.type, messagesWorker);
}

export default messagesSaga;
