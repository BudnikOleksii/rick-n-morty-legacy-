const httpStatusCodes = require('../utils/http-status-codes');
const { getUserById } = require('../services/users');
const { getAllUsers } = require('../repositories/users');

const httpGetAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    return res.status(httpStatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const httpGetUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    return res.status(httpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  httpGetAllUsers,
  httpGetUserById,
};
