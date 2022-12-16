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

io.on('connection', (socket) => {
  setInterval(() => {
    socket.emit('sendMessage', {
      msg: Math.random(),
    });
  }, 2000);

  socket.on(socketEvents.join, ({ roomId, userName }) => {
    socket.rooms.forEach((room) => socket.leave(room));
    socket.join(roomId);
    socket.to(roomId).emit(socketEvents.receive, `${userName} just join room number ${roomId}`);
  });

  socket.on(socketEvents.send, (data) => {
    socket.to(socket.rooms.values().next().value).emit(socketEvents.receive, data.msg);
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
