const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { SetsRepository } = require('../repositories/sets');
const { SetsService } = require('./sets');
const { mockData } = require('../repositories/__mocks__/sets').SetsRepository;

const { mockSet, mockSetsFromDB } = mockData;

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

  it('should return correct info object', async function () {
    const { info } = await SetsService.getSets(page, limit, endpoint);

    expect(info.total).toBe(mockSetsFromDB.total);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
  });

  it('should return an array of chats', async function () {
    const { results } = await SetsService.getSets(page, limit, endpoint);

    expect(results).toStrictEqual(mockSetsFromDB.results);
  });
});
describe('getSet', function () {
  it('should not call SetsRepository.getSets if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(1);
    await expect(SetsService.getSet('name', 'not found set')).rejects.toThrow(NotFoundError);
  });

  it('should return set', async function () {
    const set = await SetsService.getSet('name', mockSet.name);

    expect(set).toStrictEqual(mockSet);
  });
});
