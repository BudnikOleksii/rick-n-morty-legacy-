const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError } = require('../utils/errors/ApiErrors');

const MAX_USERS_PER_REQUEST = 100;

const getAllUsers = async (skip, limit) => {
  if (limit > MAX_USERS_PER_REQUEST) {
    throw new BadRequestError('Cannot fetch more than 100 users per request');
  }

  const users = await UserRepository.getAllUsers(skip, limit);

  if (!users.length) {
    throw new NotFoundError('Users not found');
  }

  return users;
}

const getUserById = async (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new BadRequestError('Invalid ID');
  }

  const user = await UserRepository.getUser(id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

module.exports.UserService = {
  getAllUsers,
  getUserById,
};
