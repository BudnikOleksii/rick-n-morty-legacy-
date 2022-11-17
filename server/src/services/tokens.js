require('dotenv').config();
const jwt = require('jsonwebtoken');

const { generateTokens } = require('../utils/generate-tokens');
const { TokenRepository } = require('../repositories/tokens');
const { InternalServerError, UnauthorizedError} = require('../utils/errors/api-errors');

const getToken = (columnName, value) => {
  return TokenRepository.getToken(columnName, value);
};

const createTokens = async (userId, roles) => {
  const { accessToken, refreshToken } = generateTokens({
    id: userId,
    roles,
  });

  let token = await getToken('user_id', userId);

  if (token) {
    token = await TokenRepository.refreshToken(token.id, refreshToken);
  } else {
    token = await TokenRepository.createToken(userId, refreshToken);
  }

  return {
    accessToken,
    refreshToken: token.refresh_token,
  }
};

const removeToken = async (refreshToken) => {
  const isTokenDeleted = await TokenRepository.removeToken(refreshToken);

  if (!isTokenDeleted) {
    throw new InternalServerError(['Token was not removed']);
  }

  return isTokenDeleted;
};

const validateAccessToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return userData;
  } catch (e) {
    return null;
  }
};

const validateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return userData;
  } catch (e) {
    return null;
  }
};

const getCheckedDataFromToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedError(['Token was not provided']);
  }

  const userData = await validateRefreshToken(refreshToken);
  const tokenFromDB = await getToken('refresh_token', refreshToken);

  if (!userData || !tokenFromDB) {
    throw new UnauthorizedError(['User unauthorized']);
  }

  return {
    userData,
  };
}

module.exports.TokenService = {
  getToken,
  createTokens,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  getCheckedDataFromToken,
};