const User = require('../models/users');
const { UserRepository } = require('./users');

jest.mock('../models/users', () => ({
  query: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  whereNotDeleted: jest.fn().mockReturnThis(),
  withGraphFetched: jest.fn().mockReturnThis(),
  insertAndFetch: jest.fn().mockReturnThis(),
  page: jest.fn(),
  first: jest.fn(),
}));

describe('getAllUsers', function () {
  it('should call query builder methods whereNotDeleted, withGraphFetched and page', function () {
    UserRepository.getAllUsers(1, 20);

    expect(User.query).toBeCalled();
    expect(User.whereNotDeleted).toBeCalled();
    expect(User.withGraphFetched).toBeCalled();
    expect(User.page).toBeCalled();
  });
});

describe('getExistingUser', function () {
  it('should call query builder methods whereNotDeleted, withGraphFetched and first', function () {
    UserRepository.getExistingUser('id', 1);

    expect(User.query).toBeCalled();
    expect(User.whereNotDeleted).toBeCalled();
    expect(User.withGraphFetched).toBeCalled();
    expect(User.first).toBeCalled();
  });
});
