// TODO
// Create class UsersRepository
// Add methods for work with DB
const User = require('../models/users');

const getUser = async (id) => {
  return await User.query().findById(id);
};

module.exports = {
  getUser,
};
