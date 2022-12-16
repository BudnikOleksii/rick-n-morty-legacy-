import { Socket } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, race, cancelled, delay } from 'redux-saga/effects';
import {
  channelOff,
  channelOn,
  serverOff,
  serverOn,
  startChannel,
  stopChannel,
} from '../../features/chat-socket/chat-socket-slice';
import { socket, connect, disconnect, reconnect } from '../../api/socket-api';
import { SOCKET_EVENTS } from '../../constants';
import { PayloadAction } from '@reduxjs/toolkit';
import { addNewMessage } from '../../features/messages/messages-slice';

const createSocketChannel = (socket: Socket, payload: any) => {
  return eventChannel((emit) => {
    const handler = (data: any) => {
      emit(data);
    };

    socket.on(SOCKET_EVENTS.receive, handler);
    socket.emit(SOCKET_EVENTS.join, payload);

    return () => {
      socket.off(SOCKET_EVENTS.receive, handler);
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

function* listenServerSaga(payload: any) {
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
    const socketChannel = yield call(createSocketChannel, socket, payload);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put(serverOn());

    while (true) {
      // @ts-ignore
      const payload = yield take(socketChannel);
      yield put(addNewMessage(payload));
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

export default function* startStopChannel() {
  while (true) {
    const action = (yield take(startChannel.type)) as PayloadAction;

    yield race({
      task: call(listenServerSaga, action.payload),
      cancel: take(stopChannel.type),
    });
  }
}
