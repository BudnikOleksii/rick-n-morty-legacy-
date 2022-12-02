const bcrypt = require("bcrypt");
const { BadRequestError } = require("../utils/errors/api-errors");
const { UserService } = require("./users");
const { TokenService } = require("./tokens");

const register = async (body, ip) => {
  const user = await UserService.createUser(body, ip);
  const tokens = await TokenService.createTokens(user.id, user.roles);

  return {
    tokens,
    user,
  };
};

const login = async (body) => {
  const { login, password } = body;

  const user = await UserService.getExistingUser("login", login);
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestError(["Incorrect password"]);
  }

  const tokens = await TokenService.createTokens(user.id, user.roles);

  return {
    tokens,
    user,
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
    tokens,
    user,
  };
};

module.exports.AuthService = {
  register,
  login,
  logout,
  refreshToken,
};
