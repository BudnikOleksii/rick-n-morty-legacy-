const { checkRole } = require('../utils/check-role');
const { ForbiddenError } = require('../utils/errors/api-errors');

const roleGuard = (authorisedRole) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const { user } = req;
      const isHaveRole = checkRole(user.roles, authorisedRole);

      if (!isHaveRole) {
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
