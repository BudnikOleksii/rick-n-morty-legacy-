const bcrypt = require('bcrypt');
const { AuthService } = require('./auth');
const { BadRequestError, UnauthorizedError } = require('../utils/errors/api-errors');
const { TokenService } = require('./tokens');
const { TransactionService } = require('./transactions');
const { UserService } = require('./users');
const { mockTokens } = require('./__mocks__/tokens').TokenService;
const { mockData } = require('../repositories/__mocks__/users').UserRepository;
const { mockUserBalance } = require('./__mocks__/transactions').TransactionService;

const { mockUserFromDB, mockNewUser } = mockData;
const testUser = {
  ...mockUserFromDB,
  balance: mockUserBalance.balance,
};

jest.mock('./users');
jest.mock('./tokens');
jest.mock('./transactions');

describe('register', function () {
  it('should return user and tokens', async function () {
    const { tokens, user } = await AuthService.register();
    expect(tokens).toStrictEqual(mockTokens);
    expect(user).toStrictEqual(mockNewUser);
  });
});

describe('login', function () {
  it('should throw BadRequestError if password incorrect', async function () {
    const incorrectData = {
      login: mockUserFromDB.login,
      password: 'wrong password',
    };

    expect.assertions(3);
    await expect(AuthService.login(incorrectData)).rejects.toThrow(BadRequestError);
    expect(TokenService.createTokens).toHaveBeenCalledTimes(0);
    expect(TransactionService.getUserBalance).toHaveBeenCalledTimes(0);
  });

  it('should return user with correct balance and tokens', async function () {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

    const { tokens, user } = await AuthService.login(mockUserFromDB);

    expect(tokens).toStrictEqual(mockTokens);
    expect(user).toStrictEqual(testUser);
  });
});

describe('logout', function () {
  it('should throw UnauthorizedError error if token invalid', async function () {
    expect.assertions(2);
    await expect(AuthService.logout('invalid token')).rejects.toThrow(UnauthorizedError);
    expect(TokenService.removeToken).toHaveBeenCalledTimes(0);
  });

  it('should return 1 if token successfully deleted', async function () {
    const deletedCount = await AuthService.logout(mockTokens.refreshToken);
    expect(deletedCount).toBe(1);
  });
});

describe('refreshToken', function () {
  it('should throw UnauthorizedError error if token invalid', async function () {
    expect.assertions(3);
    await expect(AuthService.refreshToken('invalid token')).rejects.toThrow(UnauthorizedError);
    expect(UserService.getUserById).toHaveBeenCalledTimes(0);
    expect(TokenService.createTokens).toHaveBeenCalledTimes(0);
  });

  it('should return user with correct balance and new tokens', async function () {
    const { tokens, user } = await AuthService.refreshToken(mockTokens.refreshToken);

    expect(tokens).toStrictEqual(mockTokens);
    expect(user).toStrictEqual(testUser);
  });
});
