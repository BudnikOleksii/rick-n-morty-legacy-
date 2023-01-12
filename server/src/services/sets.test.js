const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { SetsRepository } = require('../repositories/sets');
const { SetsService } = require('./sets');
const { mockData } = require('../repositories/__mocks__/sets').SetsRepository;
const { mockCharacter } = require('../repositories/__mocks__/characters').CharactersRepository
  .mockData;
const { page, limit, incorrectLimit, notFoundId } = require('./__mocks__/mock-data');

const { mockSet, mockSet2, mockSetsFromDB } = mockData;
const mockCard = { character: mockCharacter };
const mockUserCards = [mockCard];
const endpoint = 'localhost:8080/v1/sets';

jest.mock('../repositories/sets');
jest.mock('../repositories/characters');
jest.mock('./cards', () => ({
  CardsService: {
    getAllUserCards: jest.fn(() => mockUserCards),
  },
}));

describe('getSets', function () {
  it('should not call SetsRepository.getSets if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(SetsService.getSets(page, incorrectLimit, endpoint)).rejects.toThrow(
      BadRequestError
    );
    expect(SetsRepository.getSets).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and an array of sets', async function () {
    const { info, results } = await SetsService.getSets(page, limit, endpoint);

    expect(info.total).toBe(mockSetsFromDB.total);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockSetsFromDB.results);
  });
});

describe('getSet', function () {
  it('should throw NotFoundError if set not found', async function () {
    expect.assertions(1);
    await expect(SetsService.getSet('name', 'not found set')).rejects.toThrow(NotFoundError);
  });

  it('should return set', async function () {
    const set = await SetsService.getSet('name', mockSet.name);
    expect(set).toStrictEqual(mockSet);
  });
});

describe('getSetsInfo', function () {
  it('should return sets info with results', async function () {
    const sets = await SetsService.getSetsInfo();

    expect(sets.results).toStrictEqual(mockSetsFromDB.results);
    expect(sets.info.total).toStrictEqual(mockSetsFromDB.total);
  });
});

describe('createSet', function () {
  it('should throw BadRequestError and not call SetsRepository methods if name length < 4', async function () {
    expect.assertions(3);
    await expect(SetsService.createSet('  a  ')).rejects.toThrow(BadRequestError);
    expect(SetsRepository.getSet).toHaveBeenCalledTimes(0);
    expect(SetsRepository.createSet).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError and not call SetsRepository.createSet if set with name already exists', async function () {
    expect.assertions(2);
    await expect(SetsService.createSet(mockSet.name)).rejects.toThrow(BadRequestError);
    expect(SetsRepository.createSet).toHaveBeenCalledTimes(0);
  });

  it('should return new set with passed name', async function () {
    const nweSetName = 'new set';
    const newSet = await SetsService.createSet(nweSetName);

    expect(newSet.name).toBe(nweSetName);
  });
});

describe('deleteSet', function () {
  it('should throw BadRequestError and not call SetsRepository.deleteSet if id Nan', async function () {
    expect.assertions(2);
    await expect(SetsService.deleteSet('not a number')).rejects.toThrow(BadRequestError);
    expect(SetsRepository.deleteSet).toHaveBeenCalledTimes(0);
  });

  it('should throw NotFoundError if set not found', async function () {
    expect.assertions(1);
    await expect(SetsService.deleteSet(notFoundId)).rejects.toThrow(NotFoundError);
  });

  it('should return count of deleted sets', async function () {
    const deleted = await SetsService.deleteSet(mockSet.id);
    expect(deleted).toBe(1);
  });
});

describe('toggleCharactersInSet', function () {
  it('should return set without character if it already in set', async function () {
    const set = await SetsService.toggleCharactersInSet(mockSet.id, mockCharacter.id);
    const characterInSet = set.characters.find((char) => char.id === mockCharacter.id);

    expect(characterInSet).toBeUndefined();
  });

  it('should return set without character if it already in set', async function () {
    const set = await SetsService.toggleCharactersInSet(mockSet2.id, mockCharacter.id);
    const characterInSet = set.characters.find((char) => char.id === mockCharacter.id);

    expect(characterInSet).toStrictEqual(mockCharacter);
  });
});

describe('getUserSets', function () {
  it('should return user sets array and rating bonus', async function () {
    const { ratingBonus, userSets } = await SetsService.getUserSets(1);

    expect(ratingBonus).toBe(mockUserCards.length);
    expect(userSets.length).toBe(mockUserCards.length);
    expect(Array.isArray(userSets)).toBeTruthy();
  });
});
