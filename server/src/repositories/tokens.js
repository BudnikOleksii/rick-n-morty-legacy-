const Token = require('../models/tokens');

const getToken = (columnName, value) => {
  return Token.query()
    .where(columnName, value)
    .first();
};

const createToken = (userId, token) => {
  return Token.query().insertAndFetch({
    user_id: userId,
    refresh_token: token,
  });
};

const refreshToken = (id, token) => {
  return Token.query().patchAndFetchById(id,{ refresh_token: token });
};

module.exports.TokenRepository = {
  getToken,
  createToken,
  refreshToken,
};
