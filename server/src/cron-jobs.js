const cron = require('node-cron');

const { checkFinishedLotsInterval } = require('../config').server;
const { LotsService } = require('./services/lots');

const initCronJobs = () => {
  cron.schedule(checkFinishedLotsInterval, LotsService.closeAllFinishedAuctions);
};

module.exports = {
  initCronJobs,
};
