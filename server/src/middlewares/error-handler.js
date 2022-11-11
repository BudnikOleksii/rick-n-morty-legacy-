const BaseError = require('../utils/errors/BaseError');
const { Api500Error } = require('../utils/errors/ApiErrors');

const errorHandler = (err, req, res) => {
  let error = err;

  if (!(error instanceof BaseError)) {
    error = new Api500Error('Something went wrong');
  }

  return res.status(error.statusCode).json(error);
};

module.exports = {
  errorHandler,
};
