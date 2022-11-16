const { UnauthorizedError } = require('../utils/errors/api-errors');
const { TokenService } = require('../services/tokens');

const authMiddleware = (authorisedRoles) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const authorisationHeader = req.headers.authorization;

      if (!authorisationHeader) {
        throw new UnauthorizedError('User not authorised');
      }

      const accessToken = authorisationHeader.split(' ')[1];

      if (!accessToken) {
        throw new UnauthorizedError('User not authorised');
      }

      const userData = await TokenService.validateAccessToken(accessToken);

      if (!userData) {
        throw new UnauthorizedError('User not authorised');
      }

      const hasRole = userData.roles.some(role => authorisedRoles.includes(role.title));

      if (!hasRole) {
        throw new UnauthorizedError('User does not have access privileges');
      }

      req.user = userData;
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = {
  authMiddleware,
};
