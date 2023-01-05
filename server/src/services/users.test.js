const { UserService } = require('./users');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { MailService } = require('./mail-service');

const mockAdminRole = { id: 1, title: 'admin' };
const mockUserRole = { id: 2, title: 'user' };
const mockRoles = [mockAdminRole, mockUserRole];

const mockIp = '127.0.0.1';
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
  roles: [mockAdminRole],
  activation_link: '12345678',
};

const mockUsers = [mockUserFromDB];

const mockUsersFromDB = {
  results: mockUsers,
  total: 1,
};

const mockNewUserData = {
  username: 'user',
  login: 'user@gmail.com',
  password: '12345678',
};

const mockNewUser = {
  ...mockNewUserData,
  id: 2,
  ip: mockIp,
  activation_link: 'root',
  activated: false,
  deleted_at: null,
  stripe_account_id: null,
  roles: [mockUserRole],
};

const mockFindUserById = (id) => mockUsers.find((user) => user.id === id);

jest.mock('../repositories/users', () => ({
  UserRepository: {
    getAllUsers: jest.fn(() => mockUsersFromDB),
    getExistingUser: jest.fn(
      (columnName, value) => mockUsers.find((user) => user[columnName] === value) || null
    ),
    createUser: jest.fn(() => mockNewUser),
    updateUser: jest.fn((id, payload) => {
      const user = mockUsers.find((user) => user.id === id);

      return user ? { ...user, ...payload } : null;
    }),
    deleteUser: jest.fn((id) => (mockUsers.find((user) => user.id === id) ? 1 : 0)),
    addNewRole: jest.fn((user, roleTitle) => {
      const currentRole = mockRoles.find((role) => role.title === roleTitle);

      if (currentRole) {
        user.roles.push(currentRole);
      }

      return user;
    }),
    updateLastSeen: jest.fn((id, ip) => {
      const user = mockFindUserById(id);

      if (user) {
        user.last_visit_date = mockNewDate;
      }
    }),
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
    expect.assertions(2);
    await expect(UserService.getAllUsers(page, limit * 1000, endpoint)).rejects.toThrow(
      BadRequestError
    );
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
    expect.assertions(2);
    await expect(UserService.getUserById('test')).rejects.toThrow(BadRequestError);
    expect(UserRepository.getExistingUser).toHaveBeenCalledTimes(0);
  });
});

describe('createUser', function () {
  it('should throw bad request error if user with same login or username already exists', async function () {
    expect.assertions(3);
    await expect(UserService.createUser(mockUserFromDB, mockIp)).rejects.toThrow(BadRequestError);
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
  const updatePayload = { password: 'rootroot', ip: '0.0.0.1' };

  it('should return user with updated fields', async function () {
    const updatedUser = await UserService.updateUser(1, updatePayload);

    expect(updatedUser.ip).toBe(updatePayload.ip);
    expect(updatedUser.password).toBe(updatePayload.password);
  });
});

describe('deleteUser', function () {
  it('should return amount of deleted users if user with id found', async function () {
    const deletedUsersCount = await UserService.deleteUser(1);

    expect(deletedUsersCount).toBe(1);
  });

  it('should return throw error if user with id not found', async function () {
    expect.assertions(1);
    await expect(UserService.deleteUser(3)).rejects.toThrow(NotFoundError);
  });
});

describe('addNewRole', function () {
  const newRole = 'user';
  it('should return user with new role', async function () {
    const userWithNewRole = await UserService.addNewRole(1, newRole);

    expect(userWithNewRole.roles.some((role) => role.title === newRole)).toBeTruthy();
  });

  it('should not add new role if user already have this role', async function () {
    expect.assertions(1);
    await expect(UserService.addNewRole(1, newRole)).rejects.toThrow(BadRequestError);
  });
});
