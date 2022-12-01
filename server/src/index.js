const http = require('http');

const { port, socketEvents } = require('../config').server;
const app = require('./app');
const { LotsService } = require('./services/lots');
const { initCronJobs } = require('./cron-jobs');

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on(socketEvents.join, ({ roomId, userName }) => {
    // Leave all rooms before join another one
    socket.rooms.forEach(room => socket.leave(room));
    socket.join(roomId);
    socket.to(roomId).emit(socketEvents.receive, `${userName} just join room number ${roomId}`);
  });

  socket.on(socketEvents.send, (data) => {
    // get room id from current socket room
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
