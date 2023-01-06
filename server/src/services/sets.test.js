const { BadRequestError } = require('../utils/errors/api-errors');
const { SetsRepository } = require('../repositories/sets');
const { SetsService } = require('./sets');

jest.mock('../repositories/sets');
describe('getSets', function () {
  const page = 1;
  const limit = 20;
  const endpoint = 'localhost:8080/v1/sets';

  it('should not call SetsRepository.getSets if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(SetsService.getSets(page, limit * 1000, endpoint)).rejects.toThrow(
      BadRequestError
    );
    expect(SetsRepository.getSets).toHaveBeenCalledTimes(0);
  });

  // it('should call UserRepository.getAllUsers', async function () {
  //   await UserService.getAllUsers(page, limit, endpoint);
  //
  //   expect(UserRepository.getAllUsers).toBeCalled();
  // });
  //
  // it('should return correct info object', async function () {
  //   const { info } = await UserService.getAllUsers(page, limit, endpoint);
  //
  //   expect(info.total).toBe(mockUsersFromDB.total);
  //   expect(info.next).toBeNull();
  //   expect(info.prev).toBeNull();
  //   expect(info.pages).toBe(1);
  // });
  //
  // it('should return an array of users', async function () {
  //   const { results } = await UserService.getAllUsers(page, limit, endpoint);
  //
  //   expect(results).toBe(mockUsersFromDB.results);
  // });
});
