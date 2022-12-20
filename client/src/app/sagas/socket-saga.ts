import { Socket } from 'socket.io-client';
import { EventChannel, eventChannel, SagaIterator } from 'redux-saga';
import { take, call, put, fork, race, cancelled, delay } from 'redux-saga/effects';
import {
  channelOff,
  channelOn,
  serverOff,
  serverOn,
  setUsersInRoomIds,
  startChannel,
  stopChannel,
} from '../../features/chat-socket/chat-socket-slice';
import { socket, connect, onDisconnect, onReconnect } from '../../api/socket-api';
import { SOCKET_EVENTS } from '../../constants';
import { PayloadAction } from '@reduxjs/toolkit';
import { handleMessageReceive } from '../../features/messages/messages-slice';
import { IMessage } from '../../types/chat-messages';
import { getItemFromLocalStorage } from '../../helpers/localstorage-helpers';
import { store } from '../store';

const createSocketChannel = (socket: Socket, roomId: number) => {
  return eventChannel((emit) => {
    const newMessageHandler = (data: IMessage) => {
      emit(data);
    };
    const newUserJoinHandler = (usersIds: number[]) => {
      store.dispatch(setUsersInRoomIds(usersIds));
    };

    socket.on(SOCKET_EVENTS.receive, newMessageHandler);
    socket.on(SOCKET_EVENTS.usersOnlineInfo, newUserJoinHandler);
    socket.emit(SOCKET_EVENTS.join, {
      roomId,
      userId: getItemFromLocalStorage('user')?.id,
    });

    return () => {
      socket.off(SOCKET_EVENTS.receive, newMessageHandler);
      socket.off(SOCKET_EVENTS.usersOnlineInfo, newUserJoinHandler);
    };
  });
};

function* listenDisconnectSaga() {
  while (true) {
    yield call(onDisconnect);
    yield put(serverOff());
  }
}

function* listenConnectSaga() {
  while (true) {
    yield call(onReconnect);
    yield put(serverOn());
  }
}

function* listenServerSaga(roomId: number): SagaIterator {
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
    const socketChannel = (yield call(createSocketChannel, socket, roomId)) as EventChannel<any>;
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put(serverOn());

    while (true) {
      const payload = (yield take(socketChannel)) as IMessage;
      yield put(handleMessageReceive(payload));
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect();
      yield put(channelOff());
    }
  }
}

export default function* startStopChannel() {
  while (true) {
    const action = (yield take(startChannel.type)) as PayloadAction<number>;

    yield race({
      task: call(listenServerSaga, action.payload),
      cancel: take(stopChannel.type),
    });
  }
}
