const { UnauthorizedError } = require('../../utils/errors/api-errors');
const { mockData } = require('../../repositories/__mocks__/users').UserRepository;

const { mockUserFromDB } = mockData;

const mockTokens = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

module.exports.TokenService = {
  createTokens: jest.fn(() => mockTokens),
  getCheckedDataFromToken: jest.fn((refreshToken) => {
    if (refreshToken !== mockTokens.refreshToken) {
      throw new UnauthorizedError(['Not authorized']);
    }
    return mockUserFromDB;
  }),
  removeToken: jest.fn((refreshToken) => (refreshToken === mockTokens.refreshToken ? 1 : 0)),
  mockTokens,
};
