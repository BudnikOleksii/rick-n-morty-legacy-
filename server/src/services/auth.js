const bcrypt = require('bcrypt');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, InternalServerError, NotFoundError } = require('../utils/errors/api-errors');
const { TokenService } = require('./tokens');

const saltRounds = 7;

const register = async (body) => {
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

  const user = await UserRepository.createUser({
    username,
    login,
    password: hashPassword,
    ip,
  });

  if (!user) {
    throw new InternalServerError(['Cannot create user']);
  }

  const { accessToken, refreshToken } = await TokenService.createTokens(user.id, user.roles);

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const login = async (body) => {
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

  const userWithUpdatedIp = await UserRepository.updateUser(user.id, { ip });
  const { accessToken, refreshToken } = await TokenService.createTokens(user.id, user.roles);

  return {
    accessToken,
    refreshToken,
    user: userWithUpdatedIp,
  };
};

const logout = (refreshToken) => {
  return TokenService.removeToken(refreshToken);
};

module.exports.AuthService = {
  register,
  login,
  logout,
};
