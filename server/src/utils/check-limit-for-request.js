const config = require('../../config');
const { BadRequestError } = require('./errors/api-errors');

const { maxPerRequest } = config.server;

const checkLimitForRequest = (limit, tableName) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} ${tableName} per request`]);
  }
};

module.exports = {
  checkLimitForRequest,
};
