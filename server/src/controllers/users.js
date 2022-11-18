const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { UserService } = require('../services/users');

const { defaultPage, defaultLimitPerPage } = config.server;

const getAllUsers = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;

  try {
    const usersData = await UserService.getAllUsers(page, limit);

    return res.status(httpStatusCodes.OK).json(usersData);
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
    const isDeleted = await UserService.deleteUser(id, req.user);

    return res.status(httpStatusCodes.OK).json(isDeleted);
  } catch (error) {
    next(error);
  }
};

const addNewRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const userWithNewRole = await UserService.addNewRole(id, role, req.user);

    return res.status(httpStatusCodes.OK).json(userWithNewRole);
  } catch (error) {
    next(error);
  }
};

module.exports.UserController = {
  getAllUsers,
  getUserById,
  deleteUser,
  addNewRole,
};
