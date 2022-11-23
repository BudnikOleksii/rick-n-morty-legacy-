const { defaultAuctionDuration } = require('../../config').server;

const generateEndDate = (auctionDuration = defaultAuctionDuration) => {
  return new Date((new Date()).getTime() + auctionDuration);
};

module.exports = {
  generateEndDate,
};
