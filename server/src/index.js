const http = require('http');

const { port, socketEvents } = require('../config').server;
const app = require('./app');
const { LotsService } = require('./services/lots');
const { initCronJobs } = require('./cron-jobs');

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  const sendUsersInRoomIds = (roomId) => {
    const users = [];

    io.sockets.adapter.rooms.get(roomId).forEach((socketId) => {
      users.push(onlineUsers.get(socketId));
    });

    socket.to(roomId).emit(socketEvents.usersOnlineInfo, users);
  };

  socket.on(socketEvents.join, ({ roomId, userId }) => {
    socket.rooms.forEach((room) => socket.leave(room));
    socket.join(roomId);
    onlineUsers.set(socket.id, userId);

    sendUsersInRoomIds(roomId);
  });

  socket.on(socketEvents.send, (data) => {
    socket.to(data.chat_id).emit(socketEvents.receive, data);
  });

  socket.on('disconnecting', () => {
    onlineUsers.delete(socket.id);

    socket.rooms.forEach((roomId) => {
      sendUsersInRoomIds(roomId);
    });
  });
});

const startServer = async () => {
  await LotsService.closeAllFinishedAuctions();
  initCronJobs();

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
};

startServer();
