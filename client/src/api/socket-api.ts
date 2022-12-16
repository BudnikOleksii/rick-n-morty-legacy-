import io, { Socket } from 'socket.io-client';

const socketServerURL = 'http://localhost:8080';

export let socket: Socket;
export const connect = () => {
  socket = io(socketServerURL);

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

export const disconnect = () => {
  socket = io(socketServerURL);

  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

export const reconnect = () => {
  socket = io(socketServerURL);

  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};
