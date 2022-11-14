// TODO
// Create class UsersService that get instance of our UsersRepository
// Crate methods for work with our repository, all logic here
// Summary: Encapsulates all business logic
const { getUser } = require('../repositories/users');
const { BadRequestError, NotFoundError } = require('../utils/errors/ApiErrors');

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
  getUserById,
};
