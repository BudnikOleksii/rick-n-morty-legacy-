const User = require('../models/users');
const { RoleRepository } = require('./roles');

const getAllUsers = (page, limit) => {
  return User.query()
    .select()
    .whereNotDeleted()
    .withGraphFetched('roles')
    .page(page - 1, limit);
};

const getUser = (columnName, value) => {
  return User.query().findOne(columnName, value);
};

const getExistingUser = (columnName, value) => {
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

  const role = await RoleRepository.getRole('user');

  await createdUser
    .$relatedQuery('roles')
    .relate(role);

  return getExistingUser('id', createdUser.id);
};

const updateUser = async (id, payload) => {
  await User.query().patch(payload).findById(id);

  return getExistingUser('id', id);
};

const deleteUser = (id) => User.query().deleteById(id);

const addNewRole = async (user, role) => {
  const roleFromDB = await RoleRepository.getRole(role);

  await user
    .$relatedQuery('roles')
    .relate(roleFromDB);

  return getExistingUser('id', user.id);
};

module.exports.UserRepository = {
  getUser,
  getExistingUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  addNewRole,
};
