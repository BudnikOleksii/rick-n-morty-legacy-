const httpStatusCodes = require('../utils/http-status-codes');
const { AuthService } = require('../services/auth');
const { validate } = require('../validations/validate');
const { getIpFromRequest } = require('../utils/get-ip-from-request');

const registration = async (req, res, next) => {
  try {
    validate(req);

    const ip = getIpFromRequest(req);
    const userData = await AuthService.register(req.body, ip);
    console.log(userData);

    return res.status(httpStatusCodes.CREATED).json(userData);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    validate(req);

    const userData = await AuthService.login(req.body);

    return res.status(httpStatusCodes.OK).json(userData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const token = await AuthService.logout(refreshToken);

    return res.status(httpStatusCodes.OK).json(token);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const userData = await AuthService.refreshToken(refreshToken);

    return res.status(httpStatusCodes.OK).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports.AuthController = {
  registration,
  login,
  logout,
  refreshToken,
};
