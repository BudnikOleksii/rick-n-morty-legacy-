const BaseError = require('./BaseError');

class BadRequestError extends BaseError {
  constructor (
    name,
    description = 'Bad request.',
    isOperational = true
  ) {
    super(name, isOperational, description);
  }
}

class NotFoundError extends BaseError {
  constructor (
    name,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, isOperational, description);
  }
}

class InternalServerError extends BaseError {
  constructor (
    name,
    description = 'Internal server.',
    isOperational = true
  ) {
    super(name, isOperational, description);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
};
