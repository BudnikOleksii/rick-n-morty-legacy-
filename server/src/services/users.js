const { v4: uuidv4 } = require('uuid');
const config = require('../../config');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const bcrypt = require('bcrypt');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { MailService } = require('./mail-service');
const { createActivationLink } = require('../utils/createActivationLink');

const { saltRounds } = config.server;

const getAllUsers = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'users');
  const { results, total } = await UserRepository.getAllUsers(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getUser = (columnName, value) => UserRepository.getExistingUser(columnName, value);

const getExistingUser = async (columnName, value) => {
  const user = await getUser(columnName, value);

  if (!user) {
    throw new NotFoundError(['User not found']);
  }

  return user;
};

const getUserById = async (id) => {
  checkId(id);

  return getExistingUser('id', id);
};

const createUser = async (userData, ip) => {
  const { username, login, password } = userData;

  let candidate = await getUser('login', login);

  if (candidate) {
    throw new BadRequestError(['Current email already in use']);
  }

  candidate = await getUser('username', username);

  if (candidate) {
    throw new BadRequestError(['Current user already exists']);
  }

  const hashPassword = await bcrypt.hash(password, saltRounds);
  const activationLink = uuidv4();

  const user = await UserRepository.createUser({
    username,
    login,
    password: hashPassword,
    ip,
    activation_link: activationLink,
  });

  await MailService.sendActivationMail(login, createActivationLink(activationLink));

  return user;
};

const updateUser = (id, payload) => UserRepository.updateUser(id, payload);

const deleteUser = async (id) => {
  await getUserById(id);

  return UserRepository.deleteUser(id);
};

const addNewRole = async (userId, newRole) => {
  const user = await getUserById(userId);
  const isUserHaveThisRole = user.roles.some((role) => role.title === newRole);

  if (isUserHaveThisRole) {
    throw new BadRequestError(['User already have this role']);
  }

  return UserRepository.addNewRole(user, newRole);
};

const updateLastSeen = async (id, ipAddress) => {
  const user = await getUserById(id);
  const ip = ipAddress || user.ip;

  return UserRepository.updateLastSeen(id, ip);
};

const getUserChats = async (id) => {
  checkId(id);

  const user = await UserRepository.getUserChats(id);

  if (!user) {
    throw new NotFoundError(['User not found']);
  }

  return user;
};

const activateAccount = async (activationLink) => {
  const user = await getUser('activation_link', activationLink);

  if (!user) {
    throw new NotFoundError(['User not found']);
  }

  return updateUser(user.id, { activated: true });
};

module.exports.UserService = {
  getAllUsers,
  getUserById,
  getUser,
  getExistingUser,
  createUser,
  updateUser,
  deleteUser,
  addNewRole,
  updateLastSeen,
  getUserChats,
  activateAccount,
};
