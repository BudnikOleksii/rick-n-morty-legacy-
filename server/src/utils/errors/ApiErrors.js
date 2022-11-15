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
    errors,
    description = 'Not found.',
    isOperational = true
  ) {
    super(errors, isOperational, description);
  }
}

class InternalServerError extends BaseError {
  constructor (
    errors,
    description = 'Internal server.',
    isOperational = true
  ) {
    super(errors, isOperational, description);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
};
