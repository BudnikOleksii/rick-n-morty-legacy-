const { UnauthorizedError } = require('../utils/errors/api-errors');
const { TokenService } = require('../services/tokens');

const authGuard = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedError(['User not authorised']);
    }

    const userData = await TokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw new UnauthorizedError(['Invalid token']);
    }

    req.user = userData;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authenticationGuard: authGuard,
};
