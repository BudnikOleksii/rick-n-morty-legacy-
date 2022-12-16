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
  socket.on(socketEvents.join, ({ roomId }) => {
    socket.rooms.forEach((room) => socket.leave(room));
    socket.join(roomId);
    console.log(roomId);
    // TODO emit some event to notify that user online
    // socket.to(roomId).emit(socketEvents.receive, `${userName} just join room number ${roomId}`);
  });

  socket.on(socketEvents.send, (data) => {
    socket.to(data.chat_id).emit(socketEvents.receive, data);
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
