const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, InternalServerError, NotFoundError } = require('../utils/errors/api-errors');
const { secretKey } = require('../../config');

const saltRounds = 7;

const generateAccessToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '24h' });
};

const registerUser = async (body) => {
  const {
    username, login, password, ip
  } = body;

  let candidate = await UserRepository.getUser('login', login);

  if (candidate) {
    throw new BadRequestError(['Current email already in use']);
  }

  candidate = await UserRepository.getUser('username', username);

  if (candidate) {
    throw new BadRequestError(['Current user already exists']);
  }

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  const user = await UserRepository.createUser({
    username,
    login,
    password: hashPassword,
    ip,
  });

  if (!user) {
    throw new InternalServerError('Cannot create user');
  }

  return user;
};

const loginUser = async (body) => {
  const {
    login, password, ip
  } = body;

  const user = await UserRepository.getUser('login', login);

  if (!user) {
    throw new NotFoundError(['User with current email doesnt exists']);
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestError(['Incorrect password']);
  }

  const token = generateAccessToken({
    id: user.id,
    roles: user.roles,
  });

  const userWithUpdatedIp = await UserRepository.updateUser(user.id, { ip });

  return {
    token,
    user: userWithUpdatedIp,
  };
};

module.exports.AuthService = {
  registerUser,
  loginUser,
};
