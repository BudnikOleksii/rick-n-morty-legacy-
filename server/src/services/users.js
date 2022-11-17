const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError, ForbiddenError, InternalServerError} = require('../utils/errors/api-errors');
const { verifyPermission } = require('../utils/verify-permission');
const bcrypt = require('bcrypt');

const MAX_USERS_PER_REQUEST = 100;
const saltRounds = 7;

const getAllUsers = async (skip, limit) => {
  if (limit > MAX_USERS_PER_REQUEST) {
    throw new BadRequestError(['Cannot fetch more than 100 users per request']);
  }

  const users = await UserRepository.getAllUsers(skip, limit);

  if (!users.length) {
    throw new NotFoundError(['Users not found']);
  }

  return users;
}

const getExistingUser = async (columnName, value) => {
  const user = await UserRepository.getExistingUser(columnName, value);

  if (!user) {
    throw new NotFoundError(['User doesnt exists']);
  }

  return user;
};

const getUserById = async (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new BadRequestError(['Invalid ID']);
  }

  return getExistingUser('id', id);
};

const getUser = (columnName, value) => {
  return UserRepository.getUser(columnName, value);
};

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

const updateUser = (id, payload) => {
  return UserRepository.updateUser(id, payload);
}

const deleteUser = async (id, tokenData) => {
  const isUserHavePermission = verifyPermission(tokenData, id);

  if (!isUserHavePermission) {
    throw new ForbiddenError(['Forbidden']);
  }

  const user = await UserRepository.getExistingUser('id', id);

  if (!user) {
    throw new NotFoundError(['User not found']);
  }

  const deleted = await UserRepository.deleteUser(id);

  return deleted;
};

const addNewRole = async (userId, role) => {
  const user = getUserById(userId);


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
