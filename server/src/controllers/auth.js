const httpStatusCodes = require('../utils/http-status-codes');
const { validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors/ApiErrors');
const { AuthService } = require('../services/auth');

const registration = async (req, res, next) => {
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

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsArray = errors.array().map(err => err.msg);

      throw new BadRequestError(errorsArray);
    }

    const userWithToken = await AuthService.loginUser(req.body);

    return res.status(httpStatusCodes.OK).json(userWithToken);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // logout
  } catch (error) {
    next(error);
  }
};

module.exports.AuthController = {
  registration,
  login,
  logout,
};
