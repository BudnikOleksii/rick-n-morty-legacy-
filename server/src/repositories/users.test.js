const User = require('../models/users');
const { UserRepository } = require('./users');
const { RoleRepository } = require('./roles');
jest.mock('../models/users', () => ({
  query: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  whereNotDeleted: jest.fn().mockReturnThis(),
  withGraphFetched: jest.fn().mockReturnThis(),
  insertAndFetch: jest.fn().mockReturnThis(),
  $relatedQuery: jest.fn().mockReturnThis(),
  relate: jest.fn().mockReturnThis(),
  patch: jest.fn().mockReturnThis(),
  findById: jest.fn().mockReturnThis(),
  deleteById: jest.fn(),
  page: jest.fn(),
  first: jest.fn(),
}));

jest.mock('./roles');
const mockId = 1;
const mockRoles = 'roles';
const mockChats = 'chats';

describe('getAllUsers', function () {
  it('should call query builder methods whereNotDeleted, withGraphFetched and page', function () {
    UserRepository.getAllUsers(1, 20);

    expect(User.query).toBeCalled();
    expect(User.whereNotDeleted).toBeCalled();
    expect(User.withGraphFetched).toBeCalledWith(mockRoles);
    expect(User.page).toBeCalled();
  });
});

describe('getExistingUser', function () {
  it('should call query builder methods whereNotDeleted, withGraphFetched and first', function () {
    UserRepository.getExistingUser('id', 1);

    expect(User.query).toBeCalled();
    expect(User.whereNotDeleted).toBeCalled();
    expect(User.withGraphFetched).toBeCalledWith(mockRoles);
    expect(User.first).toBeCalled();
  });
});

describe('createUser', function () {
  it('should call query builder method insertAndFetch', function () {
    UserRepository.createUser();

    expect(User.query).toBeCalled();
    expect(User.insertAndFetch).toBeCalled();
  });
});

describe('updateUser', function () {
  it('should call query builder methods patch and findById with correct id', function () {
    UserRepository.updateUser(mockId);

    expect(User.query).toBeCalled();
    expect(User.patch).toBeCalled();
    expect(User.findById).toBeCalledWith(mockId);
  });
});

describe('deleteUser', function () {
  it('should call query builder method deleteById with correct id', function () {
    UserRepository.deleteUser(mockId);

    expect(User.query).toBeCalled();
    expect(User.deleteById).toBeCalledWith(mockId);
  });
});

describe('getUserChats', function () {
  it('should call query builder methods findById and withGraphFetched with correct args', function () {
    UserRepository.getUserChats(mockId);

    expect(User.query).toBeCalled();
    expect(User.findById).toBeCalledWith(mockId);
    expect(User.withGraphFetched).toBeCalledWith(mockChats);
  });
});

describe('updateLastSeen', function () {
  it('should call query builder method patch and findById', function () {
    UserRepository.updateLastSeen(mockId);

    expect(User.query).toBeCalled();
    expect(User.patch).toBeCalled();
    expect(User.findById).toBeCalledWith(mockId);
  });
});
