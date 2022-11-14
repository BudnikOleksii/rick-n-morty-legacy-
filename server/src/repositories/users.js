const User = require('../models/users');

const getAllUsers = (skip, limit) => {
  return User.query()
    .select()
    .whereNotDeleted()
    .withGraphFetched('roles')
    .limit(limit)
    .offset(skip);
}

const getUser = (id) => {
  return User.query()
    .select()
    .whereNotDeleted()
    .where('id', id)
    .withGraphFetched('roles')
    .first();
};

module.exports.UserRepository = {
  getUser,
  getAllUsers,
};
