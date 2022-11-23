const { UnauthorizedError } = require('../utils/errors/api-errors');
const { TokenService } = require('../services/tokens');

const authenticationGuard = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const authorisationHeader = req.headers.authorization;

    if (!authorisationHeader) {
      throw new UnauthorizedError(['User not authorised']);
    }

    const accessToken = authorisationHeader.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedError(['User not authorised']);
    }

    const userData = await TokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw new UnauthorizedError(['User not authorised']);
    }

    req.user = userData;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authenticationGuard,
};
