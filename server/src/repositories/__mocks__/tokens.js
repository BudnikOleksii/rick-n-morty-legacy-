const mockToken = { id: 1, user_id: 1, access_token: 'accessToken', refresh_token: 'refreshToken' };
const mockToken2 = {
  id: 2,
  user_id: 2,
  access_token: 'accessToken2',
  refresh_token: 'refreshToken2',
};
const mockTokens = [mockToken, mockToken2];

const getToken = jest.fn((columnName, value) =>
  mockTokens.find((token) => token[columnName] === value)
);

module.exports.TokenRepository = {
  getToken,
  removeToken: jest.fn(),
  createToken: jest.fn((userId, refreshToken) => ({ userId, refresh_token: refreshToken })),
  removeRefreshToken: jest.fn((refreshToken) => (getToken('refresh_token', refreshToken) ? 1 : 0)),
  mockData: {
    mockToken,
  },
};
