// TODO
// Create class UsersService that get instance of our UsersRepository
// Crate methods for work with our repository, all logic here
// Summary: Encapsulates all business logic
const { getUser } = require('../repositories/users');
const errorTypes = require('../utils/errors/error-types');

const getUserById = async (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new Error(errorTypes.invalidId);
  }

  const user = await getUser(id);

  if (!user) {
    throw new Error(errorTypes.notFound);
  }

  return user;
};

module.exports = {
  getUserById,
};
