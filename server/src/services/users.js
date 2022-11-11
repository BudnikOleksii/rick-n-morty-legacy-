// TODO
// Create class UsersService that get instance of our UsersRepository
// Crate methods for work with our repository, all logic here
// Summary: Encapsulates all business logic
const { getUser } = require('../repositories/users');
const { Api400Error, Api404Error} = require('../utils/errors/ApiErrors');

const getUserById = async (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new Api400Error('Invalid ID');
  }

  const user = await getUser(id);

  if (!user) {
    throw new Api404Error('Current user not found');
  }

  return user;
};

module.exports = {
  getUserById,
};
