require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, InternalServerError, NotFoundError } = require('../utils/errors/api-errors');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const saltRounds = 7;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '3h' });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });

  return {
    accessToken,
    refreshToken,
  };
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

  const hashPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashPassword);

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

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestError(['Incorrect password']);
  }

  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    roles: user.roles,
  });

  const userWithUpdatedIp = await UserRepository.updateUser(user.id, { ip });

  return {
    accessToken,
    refreshToken,
    user: userWithUpdatedIp,
  };
};

module.exports.AuthService = {
  registerUser,
  loginUser,
};
