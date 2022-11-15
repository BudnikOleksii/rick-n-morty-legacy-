const User = require('../models/users');

// hardcode, maybe we need to get users_group id from DB everytime when we create user
const USERS_GROUP_ID = 2;

const getAllUsers = (skip, limit) => {
  return User.query()
    .select()
    .whereNotDeleted()
    .withGraphFetched('roles')
    .limit(limit)
    .offset(skip);
}

const getUser = (columnName, value) => {
  return User.query()
    .select()
    .whereNotDeleted()
    .where(columnName, value)
    .withGraphFetched('roles')
    .first();
};

const createUser = async (user) => {
  const {
    username, login, password, ip
  } = user;

  const createdUser = await User.query()
    .insertAndFetch({
      username,
      login,
      password,
      ip,
    });

  await createdUser
    .$relatedQuery('roles')
    .relate(USERS_GROUP_ID);

  return getUser('id', createdUser.id);
};

const updateUser = (id, payload) => {
  return User.query().patchAndFetchById(id, payload);
};

module.exports.UserRepository = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
};
