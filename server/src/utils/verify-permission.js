const {ForbiddenError} = require('./errors/api-errors');
const checkIsAdmin = (roles) => roles.some(role => role.title === 'admin');

const verifyPermission = (tokenData, userId = 0) => {
  const isUserHavePermission = Number(userId) === tokenData.id || checkIsAdmin(tokenData.roles);

  if (!isUserHavePermission) {
    throw new ForbiddenError(['Forbidden']);
  }
};

module.exports = {
  checkIsAdmin,
  verifyPermission,
};
