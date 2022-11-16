const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors/api-errors');
const { verifyPermission } = require('../utils/verify-permission');

const MAX_USERS_PER_REQUEST = 100;

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

const getUserById = async (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new BadRequestError(['Invalid ID']);
  }

  const user = await UserRepository.getUser('id', id);

  if (!user) {
    throw new NotFoundError(['User not found']);
  }

  return user;
};

const deleteUser = async (id, tokenData) => {
  const isUserHavePermission = verifyPermission(tokenData, id);

  if (!isUserHavePermission) {
    throw new ForbiddenError(['Forbidden']);
  }

  const deleted = await UserRepository.deleteUser(id);

  return { msg: 'ok', deleted };
}

module.exports.UserService = {
  getAllUsers,
  getUserById,
  deleteUser,
};
