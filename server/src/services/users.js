const { getUser, getAllUsers } = require('../repositories/users');
const { BadRequestError, NotFoundError } = require('../utils/errors/ApiErrors');

const getUsers = () => getAllUsers();

const getUserById = async (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new BadRequestError('Invalid ID');
  }

  const user = await getUser(id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

module.exports = {
  getUsers,
  getUserById,
};
