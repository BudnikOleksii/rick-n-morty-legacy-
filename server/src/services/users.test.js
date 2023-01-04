const { UserService } = require('./users');
const { UserRepository } = require('../repositories/users');

const mockUserFromDB = {
  id: 1,
  username: 'admin',
  login: 'admin@gmail.com',
  password: 'password',
  rating: 0,
  registration_date: '2022-12-26T07:20:51.000Z',
  last_visit_date: '2023-01-04T11:24:33.000Z',
  ip: '127.0.0.1',
  activated: true,
  deleted_at: null,
  stripe_account_id: null,
  roles: ['admin'],
};

const mockUsersFromDB = {
  results: [mockUserFromDB],
  total: 1,
};
jest.mock('../repositories/users', () => ({
  UserRepository: {
    getAllUsers: jest.fn(() => mockUsersFromDB),
  },
}));

describe('getAllUsers', function () {
  const page = 1;
  const limit = 20;
  const endpoint = 'localhost:8080/v1/users';

  it('should not call UserRepository.getAllUsers if limit incorrect', async function () {
    try {
      await UserService.getAllUsers(page, limit * 1000, endpoint);
    } catch (e) {}

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
