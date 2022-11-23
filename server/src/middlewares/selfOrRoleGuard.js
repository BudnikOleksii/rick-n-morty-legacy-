const { checkRole } = require('../utils/check-role');
const { ForbiddenError } = require('../utils/errors/api-errors');

const selfOrRoleGuard = (authorisedRole) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const { user } = req;
      const isHaveRole = checkRole(user.roles, authorisedRole);
      const isCurrentUser = Number(12) === user.id;
      const isHavePermission = isHaveRole || isCurrentUser;

      if (!isHavePermission) {
        throw new ForbiddenError(['User does not have permission']);
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = {
  selfOrRoleGuard,
};
