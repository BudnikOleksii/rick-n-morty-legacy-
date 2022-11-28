const http = require('http');
const cron = require('node-cron');

const { port, checkFinishedLotsInterval } = require('../config').server;
const app = require('./app');
const { LotsService } = require('./services/lots');

const PORT = port;
const server = http.createServer(app);

const startServer = async () => {
  await LotsService.closeAllFinishedAuctions();

  cron.schedule(checkFinishedLotsInterval, async () => {
    await LotsService.closeAllFinishedAuctions();
  });

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
};

startServer();
