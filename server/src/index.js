const http = require('http');

const { port } = require('../config').server;
const app = require('./app');
const { LotsService } = require('./services/lots');
const { initCronJobs } = require('./cron-jobs');

const server = http.createServer(app);

const startServer = async () => {
  await LotsService.closeAllFinishedAuctions();
  initCronJobs();

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
};

startServer();
