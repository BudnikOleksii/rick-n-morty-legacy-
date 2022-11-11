// TODO
// Create class UsersService that get instance of our UsersRepository
// Crate methods for work with our repository, all logic here
// Summary: Encapsulates all business logic
const { getUser } = require('../repositories/users');

const getUserById = async (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new Error('Please, provide valid id');
  }

  const user = await getUser(id);

  if (!user) {
    throw new Error('Current user not found');
  }

  return user;
};

module.exports = {
  getUserById,
};
