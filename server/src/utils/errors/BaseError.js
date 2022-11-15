class BaseError extends Error {
  constructor (errors, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.errors = errors;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
