const User = require('../models/users');
const MockUser = require('../models/__mocks__/users');
const { UserRepository } = require('./users');

jest.mock('../models/users');
jest.mock('./roles');

const testId = 1;
const testUser = MockUser.mockData.find((user) => user.id === testId);

describe('getAllUsers', function () {
  it('should return results and total users count', function () {
    const { results, total } = UserRepository.getAllUsers(1, 20);
    expect(results).toStrictEqual(MockUser.mockData);
    expect(total).toBe(MockUser.mockData.length);
  });
});

describe('getExistingUser', function () {
  it('should return user', function () {
    const user = UserRepository.getExistingUser('id', testId);
    expect(user).toStrictEqual(testUser);
  });
});

describe('createUser', function () {
  it('should return created user', async function () {
    const newUser = await UserRepository.createUser();
    expect(newUser).toStrictEqual(testUser);
  });
});

describe('addNewRole', function () {
  it('should return relate role with methods $relatedQuery,relate and return updated user', async function () {
    const updatedUser = await UserRepository.addNewRole(User, MockUser);

    expect(updatedUser).toStrictEqual(testUser);
    expect(User.$relatedQuery).toBeCalled();
    expect(User.relate).toBeCalled();
  });
});

describe('updateUser', function () {
  it('should return updated user', async function () {
    const updatedUser = await UserRepository.updateUser(testId);
    expect(updatedUser).toStrictEqual(testUser);
  });
});

describe('deleteUser', function () {
  it('should return count of deleted users', function () {
    const deletedCount = UserRepository.deleteUser(testId);
    expect(deletedCount).toBe(1);
  });
});

describe('getUserChats', function () {
  it('should return user with chats', function () {
    const user = UserRepository.getUserChats(testId);
    expect(user).toStrictEqual(testUser);
  });
});

describe('updateLastSeen', function () {
  it('should update and return user', function () {
    const user = UserRepository.updateLastSeen(testId);
    expect(user).toStrictEqual(testUser);
  });
});
