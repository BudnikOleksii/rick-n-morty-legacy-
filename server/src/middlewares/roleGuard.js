const { ForbiddenError } = require('../utils/errors/api-errors');

const roleGuard = (authorisedRole) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const { user } = req;

      const hasRole = user.roles.some(role => role.title === authorisedRole);

      if (!hasRole) {
        throw new ForbiddenError(['User does not have access privileges']);
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = {
  roleGuard,
};
