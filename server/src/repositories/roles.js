const Role = require('../models/roles');

const getRole = (role) => {
  return Role.query().findOne('title', role);
};

module.exports.RoleRepository = {
  getRole,
};
