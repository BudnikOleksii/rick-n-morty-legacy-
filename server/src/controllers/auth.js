const httpStatusCodes = require('../utils/http-status-codes');
const { AuthService } = require('../services/auth');
const { validate } = require('../validations/validate');

const registration = async (req, res, next) => {
  try {
    validate(req);

    const user = await AuthService.registerUser(req.body)

    return res.status(httpStatusCodes.CREATED).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    validate(req);

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
