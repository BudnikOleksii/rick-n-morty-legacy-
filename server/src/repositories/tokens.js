const Token = require('../models/tokens');

const getToken = (columnName, value) => {
  return Token.query().where(columnName, value).first();
};

const createToken = (userId, token) => {
  return Token.query().insertAndFetch({
    user_id: userId,
    refresh_token: token,
  });
};

const removeToken = (id) => {
  return Token.query().deleteById(id);
};

module.exports.TokenRepository = {
  getToken,
  createToken,
  removeToken,
};
