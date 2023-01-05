const { UserService } = require('./users');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { MailService } = require('./mail-service');

const mockUserFromDB = {
  id: 1,
  username: 'admin',
  login: 'admin@gmail.com',
  password: 'password',
  rating: 0,
  registration_date: '2022-12-26T07:20:51.000Z',
  last_visit_date: '2023-01-04T11:24:33.000Z',
  ip: '127.0.0.1',
  activated: false,
  deleted_at: null,
  stripe_account_id: null,
  roles: ['admin'],
  activation_link: '12345678',
};

const mockUsersFromDB = {
  results: [mockUserFromDB],
  total: 1,
};

const mockNewUserData = {
  username: 'user',
  login: 'user@gmail.com',
  password: '12345678',
};

const mockIp = '127.0.0.1';

const mockNewUser = {
  ...mockNewUserData,
  id: 2,
  ip: mockIp,
  activation_link: 'root',
  activated: false,
  deleted_at: null,
  stripe_account_id: null,
  roles: ['user'],
};

jest.mock('../repositories/users', () => ({
  UserRepository: {
    getAllUsers: jest.fn(() => mockUsersFromDB),
    getExistingUser: jest.fn((columnName, value) =>
      mockUserFromDB[columnName] === value ? mockUserFromDB : null
    ),
    createUser: jest.fn(() => mockNewUser),
  },
}));

jest.mock('./mail-service', () => ({
  MailService: {
    sendActivationMail: jest.fn(),
  },
}));

describe('getAllUsers', function () {
  const page = 1;
  const limit = 20;
  const endpoint = 'localhost:8080/v1/users';

  it('should not call UserRepository.getAllUsers if limit incorrect and throw BadRequestError', async function () {
    try {
      await UserService.getAllUsers(page, limit * 1000, endpoint);
    } catch (error) {
      expect(error.constructor).toBe(BadRequestError);
    }

    expect(UserRepository.getAllUsers).toHaveBeenCalledTimes(0);
  });

  it('should call UserRepository.getAllUsers', async function () {
    await UserService.getAllUsers(page, limit, endpoint);

    expect(UserRepository.getAllUsers).toBeCalled();
  });

  it('should return correct info object', async function () {
    const { info } = await UserService.getAllUsers(page, limit, endpoint);

    expect(info.total).toBe(mockUsersFromDB.total);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
  });

  it('should return an array of users', async function () {
    const { results } = await UserService.getAllUsers(page, limit, endpoint);

    expect(results).toBe(mockUsersFromDB.results);
  });
});

describe('getUser', function () {
  it('should return user by username', async function () {
    const user = await UserService.getUser('username', 'admin');

    expect(user).toBe(mockUserFromDB);
  });

  it('should return null if user doesn`t exists', async function () {
    const user = await UserService.getUser('username', 'user');

    expect(user).toBeNull();
  });
});

describe('getExistingUser', function () {
  it('should return user', async function () {
    const user = await UserService.getExistingUser('login', 'admin@gmail.com');

    expect(user).toBe(mockUserFromDB);
  });

  it('should throw not found error if user doesnt exists', async function () {
    let response;

    try {
      response = await UserService.getExistingUser('login', 'user@gmail.com');
    } catch (error) {
      expect(error.constructor).toBe(NotFoundError);
    }

    expect(response).toBeUndefined();
  });
});

describe('getUserById', function () {
  it('should return user', async function () {
    const user = await UserService.getUserById(1);

    expect(user).toBe(mockUserFromDB);
  });

  it('should throw bad request error if provided id is incorrect', async function () {
    try {
      await UserService.getUserById('test');
    } catch (error) {
      expect(error.constructor).toBe(BadRequestError);
    }

    expect(UserRepository.getExistingUser).toHaveBeenCalledTimes(0);
  });
});

describe('createUser', function () {
  it('should throw bad request error if user with same login or username already exists', async function () {
    try {
      await UserService.createUser(mockUserFromDB, mockIp);
    } catch (error) {
      expect(error.constructor).toBe(BadRequestError);
    }

    expect(UserRepository.createUser).toHaveBeenCalledTimes(0);
    expect(MailService.sendActivationMail).toHaveBeenCalledTimes(0);
  });

  it('should return new user and send activation link to email', async function () {
    const user = await UserService.createUser(mockNewUserData, mockIp);

    expect(user).toBe(mockNewUser);
    expect(MailService.sendActivationMail).toBeCalled();
  });
});

describe('updateUser', function () {
  it('should return updated user', function () {});
});
