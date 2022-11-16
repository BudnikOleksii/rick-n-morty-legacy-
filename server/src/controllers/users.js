const httpStatusCodes = require('../utils/http-status-codes');
const { UserService } = require('../services/users');
const { getPagination } = require('../utils/get-pagination');

const getAllUsers = async (req, res, next) => {
  const { skip, limit } = getPagination(req.query);

  try {
    const users = await UserService.getAllUsers(skip, limit);

    return res.status(httpStatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserService.getUserById(id);

    return res.status(httpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserService.deleteUser(id, req.user);

    return res.status(httpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.UserController = {
  getAllUsers,
  getUserById,
  deleteUser,
};
