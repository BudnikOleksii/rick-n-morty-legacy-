const httpStatusCodes = require('../utils/http-status-codes');
const { AuthService } = require('../services/auth');
const { validate } = require('../validations/validate');

const registration = async (req, res, next) => {
  try {
    validate(req);

    const userData = await AuthService.register(req.body);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(httpStatusCodes.CREATED).json(userData);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    validate(req);

    const userData = await AuthService.login(req.body);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(httpStatusCodes.OK).json(userData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const token = await AuthService.logout(refreshToken);

    res.clearCookie('refreshToken');

    // return 1 if token was successfully deleted from DB
    return res.status(httpStatusCodes.OK).json(token);
  } catch (error) {
    next(error);
  }
};

module.exports.AuthController = {
  registration,
  login,
  logout,
};
