const Token = require('../models/__mocks__/tokens');
const { TokenRepository } = require('./tokens');

jest.mock('../models/tokens');

describe('getToken', function () {
  it('should return token found by column name', function () {
    const token = TokenRepository.getToken('refresh_token', Token.mockToken.refresh_token);
    expect(token).toStrictEqual(Token.mockToken);
  });
});

describe('createToken', function () {
  const userId = 5;
  const newToken = 'new token';

  it('should return query with new token', function () {
    const tokenQuery = TokenRepository.createToken(userId, newToken);
    expect(tokenQuery.mockResults.user_id).toStrictEqual(userId);
    expect(tokenQuery.mockResults.refresh_token).toStrictEqual(newToken);
  });
});

describe('removeToken', function () {
  it('should return number of rows deleted', function () {
    const deleted = TokenRepository.removeToken(Token.id);
    expect(deleted).toBe(1);
  });
});

describe('removeRefreshToken', function () {
  it('should return query with deleted rows', function () {
    const deleted = TokenRepository.removeRefreshToken(Token.mockToken.refresh_token);
    expect(deleted.mockResults.length).toBe(1);
  });
});
