const bcrypt = require('bcrypt');
const { BadRequestError } = require('../utils/errors/api-errors');
const { UserService } = require('./users');
const { TokenService } = require('./tokens');

const register = async (body) => {
  const user = await UserService.createUser(body);
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

  const user = await UserService.getExistingUser('login', login);
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestError(['Incorrect password']);
  }

  const userWithUpdatedIp = await UserService.updateUser(user.id, { ip });
  const { accessToken, refreshToken } = await TokenService.createTokens(user.id, user.roles);

  return {
    accessToken,
    refreshToken,
    user: userWithUpdatedIp,
  };
};

const logout = async (refreshToken) => {
  await TokenService.getCheckedDataFromToken(refreshToken);

  return TokenService.removeToken(refreshToken);
};

const refreshToken = async (refreshToken) => {
  const { userData } = await TokenService.getCheckedDataFromToken(refreshToken);
  const user = await UserService.getUserById(userData.id);
  const tokens = await TokenService.createTokens(user.id, user.roles);

  return {
    ...tokens,
    user,
  };
}

module.exports.AuthService = {
  register,
  login,
  logout,
  refreshToken,
};
