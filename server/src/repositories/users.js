const User = require('../models/users');

const getAllUsers = (skip, limit) => {
  return User.query()
    .select()
    .where('deleted', false)
    .withGraphFetched('roles')
    .limit(limit)
    .offset(skip);
}

const getUser = (id) => {
  return User.query()
    .select()
    .where('deleted', false)
    .andWhere('id', id)
    .withGraphFetched('roles')
    .first();
};

module.exports.UserRepository = {
  getUser,
  getAllUsers,
};
