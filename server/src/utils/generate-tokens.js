const jwt = require('jsonwebtoken');

const config = require('../../config');

const { jwtAccessSecret, jwtRefreshSecret, accessTokenExpiresIn, refreshTokenExpiresIn } =
  config.server;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: accessTokenExpiresIn });
  const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: refreshTokenExpiresIn });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  generateTokens,
};
