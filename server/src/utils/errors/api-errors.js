const BaseError = require('./base-error');

class BadRequestError extends BaseError {
  constructor(errors, description = 'Bad request.', isOperational = true) {
    super(errors, isOperational, description);
  }
}

class UnauthorizedError extends BaseError {
  constructor(errors, description = 'Unauthorized.', isOperational = true) {
    super(errors, isOperational, description);
  }
}

class ForbiddenError extends BaseError {
  constructor(errors, description = 'Forbidden.', isOperational = true) {
    super(errors, isOperational, description);
  }
}

class NotFoundError extends BaseError {
  constructor(errors, description = 'Not found.', isOperational = true) {
    super(errors, isOperational, description);
  }
}

class InternalServerError extends BaseError {
  /* istanbul ignore next */
  constructor(errors, description = 'Internal server.', isOperational = true) {
    super(errors, isOperational, description);
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};
