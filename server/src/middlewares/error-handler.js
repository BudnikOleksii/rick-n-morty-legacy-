const httpStatusCodes = require('../utils/http-status-codes');
const { InternalServerError, BadRequestError, NotFoundError } = require('../utils/errors/ApiErrors');

const errorHandler = (err, req, res, next) => {
  let error = err;
  let statusCode = httpStatusCodes.INTERNAL_SERVER;

  switch (err.constructor) {
    case BadRequestError:
      statusCode = httpStatusCodes.BAD_REQUEST;
      break;
    case NotFoundError:
      statusCode = httpStatusCodes.NOT_FOUND;
      break;
    default:
      error = new InternalServerError('Something went wrong');
      break;
  }

  return res.status(statusCode).json(error);
};

module.exports = {
  errorHandler,
};
