const { Api500Error } = require('../utils/errors/ApiErrors');

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!error.statusCode) {
    error = new Api500Error('Something went wrong');
  }

  res.status(error.statusCode).json(error);
};

module.exports = {
  errorHandler,
};
