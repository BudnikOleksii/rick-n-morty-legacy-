const { TokenService } = require('./tokens');
const { TokenRepository } = require('../repositories/tokens');
const { UnauthorizedError } = require('../utils/errors/api-errors');
const { mockData } = require('../repositories/__mocks__/tokens').TokenRepository;
const { mockUserFromDB } = require('../repositories/__mocks__/users').UserRepository.mockData;

const { mockToken } = mockData;
const invalidToken = 'invalid token';
const mockRefreshToken = mockToken.refresh_token;
const mockAccessToken = mockToken.access_token;

jest.mock('../repositories/tokens');
jest.mock('../utils/generate-tokens', () => ({
  generateTokens: jest.fn(() => ({ accessToken: mockAccessToken, refreshToken: mockRefreshToken })),
}));
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token) => {
    if (token !== mockRefreshToken) {
      throw new Error('');
    }

    return mockUserFromDB;
  }),
}));

describe('getToken', function () {
  it('should return token found by column value', function () {
    const token = TokenService.getToken('refresh_token', mockRefreshToken);
    expect(token).toStrictEqual(mockToken);
  });
});

describe('createTokens', function () {
  it('should return access and refresh tokens', async function () {
    const { accessToken, refreshToken } = await TokenService.createTokens(3, []);
    expect(accessToken).toBe(mockAccessToken);
    expect(refreshToken).toBe(mockRefreshToken);
  });

  it('should remove old token and return access + refresh tokens', async function () {
    const { accessToken, refreshToken } = await TokenService.createTokens(mockToken.user_id, []);
    expect(TokenRepository.removeToken).toBeCalledWith(mockToken.id);
    expect(accessToken).toBe(mockAccessToken);
    expect(refreshToken).toBe(mockRefreshToken);
  });
});

describe('removeToken', function () {
  it('should return 1 if token was deleted', function () {
    const deleted = TokenService.removeToken(mockRefreshToken);
    expect(deleted).toBe(1);
  });
});

describe('validateAccessToken', function () {
  it('should return user data if valid access token provided', async function () {
    const userData = await TokenService.validateAccessToken(mockRefreshToken);
    expect(userData).toStrictEqual(mockUserFromDB);
  });

  it('should return null if access token is invalid', async function () {
    const userData = await TokenService.validateAccessToken(invalidToken);
    expect(userData).toBeNull();
  });
});

describe('validateRefreshToken', function () {
  it('should return user data if valid refresh token provided', async function () {
    const userData = await TokenService.validateRefreshToken(mockRefreshToken);
    expect(userData).toStrictEqual(mockUserFromDB);
  });

  it('should return null if refresh token is invalid', async function () {
    const userData = await TokenService.validateRefreshToken(invalidToken);
    expect(userData).toBeNull();
  });
});

describe('getCheckedDataFromToken', function () {
  it('should return user data if valid refresh token provided', async function () {
    const userData = await TokenService.getCheckedDataFromToken(mockRefreshToken);
    expect(userData).toStrictEqual(mockUserFromDB);
  });

  it('should throw UnauthorizedError if token was not provided', async function () {
    expect.assertions(1);
    await expect(TokenService.getCheckedDataFromToken()).rejects.toThrow(UnauthorizedError);
  });

  it('should throw UnauthorizedError if token is invalid', async function () {
    expect.assertions(1);
    await expect(TokenService.getCheckedDataFromToken('invalid token')).rejects.toThrow(
      UnauthorizedError
    );
  });
});
