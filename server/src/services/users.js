const config = require('../../config');

const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError, InternalServerError} = require('../utils/errors/api-errors');
const { verifyPermission } = require('../utils/verify-permission');
const bcrypt = require('bcrypt');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');

const { saltRounds } = config.server;

const getAllUsers = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'users');
  const { results, total } = await UserRepository.getAllUsers(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
}

const getExistingUser = async (columnName, value) => {
  const user = await UserRepository.getExistingUser(columnName, value);

  if (!user) {
    throw new NotFoundError(['User not found']);
  }

  return user;
};

const getUserById = async (id) => {
  checkId(id);

  return getExistingUser('id', id);
};

const getUser = (columnName, value) => UserRepository.getUser(columnName, value);

const createUser = async (userData) => {
  const {
    username, login, password, ip
  } = userData;

  let candidate = await getUser('login', login);

  if (candidate) {
    throw new BadRequestError(['Current email already in use']);
  }

  candidate = await getUser('username', username);

  if (candidate) {
    throw new BadRequestError(['Current user already exists']);
  }

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const user = await UserRepository.createUser({
    username,
    login,
    password: hashPassword,
    ip,
  });

  if (!user) {
    throw new InternalServerError(['Cannot create user']);
  }

  return user;
}

const updateUser = (id, payload) => UserRepository.updateUser(id, payload);

const deleteUser = async (id, tokenData) => {
  verifyPermission(tokenData, id);
  await getUserById(id);

  return UserRepository.deleteUser(id);
};

const addNewRole = async (userId, newRole) => {
  const user = await getUserById(userId);
  const isUserHaveThisRole = user.roles.some(role => role.title === newRole);

  if (isUserHaveThisRole) {
    throw new BadRequestError(['User already have this role']);
  }

  return UserRepository.addNewRole(user, newRole);
};

module.exports.UserService = {
  getAllUsers,
  getUserById,
  getUser,
  getExistingUser,
  createUser,
  updateUser,
  deleteUser,
  addNewRole,
};
