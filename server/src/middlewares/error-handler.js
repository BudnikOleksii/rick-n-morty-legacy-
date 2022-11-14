const { Api500Error, Api400Error, Api404Error} = require('../utils/errors/ApiErrors');
const errorTypes = require('../utils/errors/error-types');

const errorHandler = (err, req, res, next) => {
  let error = err;

  switch (error.message) {
    case errorTypes.invalidId:
      error = new Api400Error(error.message);
      break;
    case errorTypes.notFound:
      error = new Api404Error(error.message);
      break;
    default:
      error = new Api500Error(errorTypes.unknownError);
      break;
  }

  return res.status(error.statusCode).json(error);
};

module.exports = {
  errorHandler,
};
