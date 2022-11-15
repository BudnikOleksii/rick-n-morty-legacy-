const { generateTokens } = require('../utils/generate-tokens');
const { TokenRepository } = require('../repositories/tokens');

const createUserTokens = async (userId, roles) => {
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

module.exports.TokenService = {
  createUserTokens,
};
