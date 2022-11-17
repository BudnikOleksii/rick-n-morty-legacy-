const checkIsAdmin = (roles) => roles.some(role => role.title === 'admin');

const verifyPermission = (tokenData, userId = 0) => {
  return Number(userId) === tokenData.id || checkIsAdmin(tokenData.roles);
};

module.exports = {
  checkIsAdmin,
  verifyPermission,
};
