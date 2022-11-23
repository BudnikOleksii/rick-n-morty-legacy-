const checkRole = (roles, authorisedRole) => roles.some(role => role.title === authorisedRole);

module.exports = {
  checkRole,
};
