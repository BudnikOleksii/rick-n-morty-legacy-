const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { UserService } = require('../services/users');
const { CardsService } = require('../services/cards');
const { SetsService } = require('../services/sets');
const { TransactionService } = require('../services/transactions');

const { defaultPage, defaultLimitPerPage } = config.server;

const getAllUsers = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl;

  try {
    const usersData = await UserService.getAllUsers(page, limit, endpoint);

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
    const isDeleted = await UserService.deleteUser(id);

    return res.status(httpStatusCodes.OK).json(isDeleted);
  } catch (error) {
    next(error);
  }
};

const addNewRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const userWithNewRole = await UserService.addNewRole(id, role);

    return res.status(httpStatusCodes.OK).json(userWithNewRole);
  } catch (error) {
    next(error);
  }
};

const getUserCards = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl + req.path;
  const { id } = req.params;

  try {
    const cardsData = await CardsService.getUserCards(page, limit, endpoint, id);

    return res.status(httpStatusCodes.OK).json(cardsData);
  } catch (error) {
    next(error);
  }
};

const getUserSets = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userSets = await SetsService.getUserSets(id);

    return res.status(httpStatusCodes.OK).json(userSets);
  } catch (error) {
    next(error);
  }
};

const getUserBalance = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userBalance = await TransactionService.getUserBalance(id);

    return res.status(httpStatusCodes.OK).json(userBalance);
  } catch (error) {
    next(error);
  }
};

const getUserChats = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userData = await UserService.getUserChats(id);

    return res.status(httpStatusCodes.OK).json(userData);
  } catch (error) {
    next(error);
  }
};

const getUserTransactions = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl + req.path;
  const { id } = req.params;

  try {
    const userTransactions = await TransactionService.getUserTransactions(page, limit, endpoint, id);

    return res.status(httpStatusCodes.OK).json(userTransactions);
  } catch (error) {
    next(error);
  }
};

module.exports.UserController = {
  getAllUsers,
  getUserById,
  deleteUser,
  addNewRole,
  getUserCards,
  getUserSets,
  getUserBalance,
  getUserChats,
  getUserTransactions,
};
