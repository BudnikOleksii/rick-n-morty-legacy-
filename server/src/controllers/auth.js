const httpStatusCodes = require('../utils/http-status-codes');
const { validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors/ApiErrors');
const { AuthService } = require('../services/auth');

const httpRegistration = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsArray = errors.array().map(err => err.msg);

      throw new BadRequestError(errorsArray);
    }

    const user = await AuthService.registerUser(req.body)

    return res.status(httpStatusCodes.CREATED).json(user);
  } catch (error) {
    next(error);
  }
};

const httpLogin = async (req, res, next) => {
  try {
    // if correct return token
  } catch (error) {
    next(error);
  }
};

const httpLogout = async (req, res, next) => {
  try {
    // logout
  } catch (error) {
    next(error);
  }
};

module.exports.AuthController = {
  httpRegistration,
  httpLogin,
  httpLogout,
};
