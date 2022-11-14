const User = require('../models/users');

const getAllUsers = () => {
  return User.query()
    .select('id', 'username', 'rating', 'registration_date', 'last_visit_date', 'ip', 'activated')
    .where('deleted_at', null)
    .withGraphFetched('roles');
}

const getUser = (id) => {
  return getAllUsers()
    .andWhere('id', id)
    .first();
};

module.exports = {
  getUser,
  getAllUsers,
};
