const { validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors/api-errors');

const validate = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsArray = errors.array().map(err => err.msg);

    throw new BadRequestError(errorsArray);
  }
};

module.exports = {
  validate,
};
