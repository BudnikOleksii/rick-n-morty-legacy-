const verifyPermission = (tokenData, userId) => {
  return Number(userId) === tokenData.id || tokenData.roles.some(role => role.title === 'admin')
};

module.exports = {
  verifyPermission,
};
