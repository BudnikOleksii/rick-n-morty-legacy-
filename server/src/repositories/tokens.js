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

const removeToken = (refreshToken) => {
  return Token.query()
    .delete()
    .where('refresh_token', '=', refreshToken)
};

module.exports.TokenRepository = {
  getToken,
  createToken,
  refreshToken,
  removeToken,
};
