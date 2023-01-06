const { UserService } = require('./users');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { MailService } = require('./mail-service');
const { mockData } = require('../repositories/__mocks__/users').UserRepository;

const { mockNewUser, mockNewDate, mockNewUserData, mockUserFromDB, mockIp, mockUsersFromDB } =
  mockData;

jest.mock('../repositories/users');
jest.mock('./mail-service');

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

    expect(results).toStrictEqual(mockUsersFromDB.results);
  });
});

describe('getUser', function () {
  it('should return user by username', async function () {
    const user = await UserService.getUser('username', 'admin');

    expect(user).toStrictEqual(mockUserFromDB);
  });

  it('should return null if user doesn`t exists', async function () {
    const user = await UserService.getUser('username', 'user');

    expect(user).toBeNull();
  });
});

describe('getExistingUser', function () {
  it('should return user', async function () {
    const user = await UserService.getExistingUser('login', 'admin@gmail.com');

    expect(user).toStrictEqual(mockUserFromDB);
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

    expect(user).toStrictEqual(mockUserFromDB);
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

    expect(user).toStrictEqual(mockNewUser);
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

describe('updateLastSeen', function () {
  it('should update last visit date and ip', async function () {
    const updated = await UserService.updateLastSeen(mockUserFromDB.id, mockIp);

    expect(updated.last_visit_date).toBe(mockNewDate);
    expect(mockUserFromDB.ip).toBe(mockIp);
  });
});

describe('getUserChats', function () {
  it('should return user with his chats', async function () {
    const user = await UserService.getUserChats(mockUserFromDB.id);

    expect(user.chats.length).toBe(1);
  });

  it('should throw bad request error if incorrect id provided', async function () {
    expect.assertions(2);
    await expect(UserService.getUserChats('test')).rejects.toThrow(BadRequestError);
    expect(UserRepository.getUserChats).toHaveBeenCalledTimes(0);
  });

  it('should throw not found if user with current id doesnt exists', async function () {
    expect.assertions(1);
    await expect(UserService.getUserChats(5)).rejects.toThrow(NotFoundError);
  });
});

describe('activateAccount', function () {
  it('should throw not found error if user with link not found', async function () {
    expect.assertions(1);
    await expect(UserService.activateAccount('incorrectLink')).rejects.toThrow(NotFoundError);
  });

  it('should change activated status to true', async function () {
    const updatedUser = await UserService.activateAccount('12345678');
    expect(updatedUser.activated).toBeTruthy();
  });
});
