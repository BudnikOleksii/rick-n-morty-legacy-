const httpStatusCodes = require('../utils/http-status-codes');
const { InternalServerError, BadRequestError, NotFoundError } = require('../utils/errors/api-errors');

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
    case InternalServerError:
      statusCode = httpStatusCodes.INTERNAL_SERVER;
      break;
    default:
      error = new InternalServerError(['Something went wrong']);
      break;
  }

  return res.status(statusCode).json(error);
};

module.exports = {
  errorHandler,
};