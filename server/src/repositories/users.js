const User = require('../models/users');
const { RoleRepository } = require('./roles');

const getAllUsers = (page, limit) => {
  return User.query()
    .whereNotDeleted()
    .withGraphFetched('roles')
    .page(page - 1, limit);
};

const getExistingUser = (columnName, value) => {
  return User.query().whereNotDeleted().where(columnName, value).withGraphFetched('roles').first();
};

const createUser = async (user) => {
  const createdUser = await User.query().insertAndFetch(user);

  const role = await RoleRepository.getRole('user');

  await createdUser.$relatedQuery('roles').relate(role);

  return getExistingUser('id', createdUser.id);
};

const updateUser = async (id, payload) => {
  await User.query().patch(payload).findById(id);

  return getExistingUser('id', id);
};

const deleteUser = (id) => User.query().deleteById(id);

const addNewRole = async (user, role) => {
  const roleFromDB = await RoleRepository.getRole(role);

  await user.$relatedQuery('roles').relate(roleFromDB);

  return getExistingUser('id', user.id);
};

const getUserChats = (id) => {
  return User.query().where('id', id).withGraphFetched('chats').first();
};

const updateLastSeen = (id, ipAddress) => User.query().patch({ ip: ipAddress }).findById(id);

module.exports.UserRepository = {
  getExistingUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  addNewRole,
  getUserChats,
  updateLastSeen,
};
