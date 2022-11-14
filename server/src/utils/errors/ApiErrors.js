const httpStatusCodes = require('../http-status-codes');
const BaseError = require('./BaseError');

class Api400Error extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'Bad request.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api404Error extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api500Error extends BaseError {
  constructor (
    name,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = 'Internal server.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = {
  Api400Error,
  Api404Error,
  Api500Error,
};
