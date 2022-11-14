class BaseError extends Error {
  constructor (name, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
