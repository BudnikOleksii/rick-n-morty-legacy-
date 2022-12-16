import { Socket } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, race, cancelled, delay } from 'redux-saga/effects';
import {
  addMessage,
  channelOff,
  channelOn,
  serverOff,
  serverOn,
  startChannel,
  stopChannel,
} from '../../features/chat-socket/chat-socket-slice';
import { socket, connect, disconnect, reconnect } from '../../api/socket-api';

const createSocketChannel = (socket: Socket) => {
  return eventChannel((emit) => {
    const handler = (data: any) => {
      emit(data);
    };

    socket.on('sendMessage', handler);

    return () => {
      socket.off('sendMessage', handler);
    };
  });
};

function* listenDisconnectSaga() {
  while (true) {
    yield call(disconnect);
    yield put(serverOff());
  }
}

function* listenConnectSaga() {
  while (true) {
    yield call(reconnect);
    yield put(serverOn());
  }
}

function* listenServerSaga() {
  try {
    yield put(channelOn());
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000),
    });

    if (timeout) {
      yield put(channelOff());
    }

    const socket = (yield call(connect)) as Socket;
    // @ts-ignore
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put(serverOn());

    while (true) {
      // @ts-ignore
      const payload = yield take(socketChannel);
      yield put(addMessage(payload));
    }
  } catch (error) {
    console.log(error);
  } finally {
    // @ts-ignore
    if (yield cancelled()) {
      socket.disconnect();
      yield put(channelOff());
    }
  }
}

export const startStopChannel = function* () {
  while (true) {
    yield take(startChannel.type);
    yield race({
      task: call(listenServerSaga),
      cancel: take(stopChannel.type),
    });
  }
};
