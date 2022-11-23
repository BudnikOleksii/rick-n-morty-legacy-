const { defaultAuctionDuration } = require('../../config').server;

const generateDefaultEndDate = () => {
  return new Date((new Date()).getTime() + defaultAuctionDuration);
};

module.exports = {
  generateDefaultEndDate,
};
