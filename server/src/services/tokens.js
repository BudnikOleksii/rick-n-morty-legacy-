const { generateTokens } = require('../utils/generate-tokens');
const { TokenRepository } = require('../repositories/tokens');
const { InternalServerError } = require('../utils/errors/api-errors');

const createTokens = async (userId, roles) => {
  const { accessToken, refreshToken } = generateTokens({
    id: userId,
    roles,
  });

  let token = await TokenRepository.getToken('user_id', userId);

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

module.exports.TokenService = {
  createTokens,
  removeToken,
};
