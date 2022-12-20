import io, { Socket } from 'socket.io-client';
import { BASE_URL } from './index';

export let socket: Socket;
export const connect = () => {
  socket = io(BASE_URL);

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

export const onDisconnect = () => {
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

export const onReconnect = () => {
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};
