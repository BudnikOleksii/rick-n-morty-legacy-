const { createUser, getExistingUser } =
  require('../../repositories/__mocks__/users').UserRepository;

module.exports.UserService = {
  createUser,
  getExistingUser,
  getUserById: jest.fn((id) => getExistingUser('id', id)),
};
