const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { CharactersService } = require('./characters');
const { CharactersRepository } = require('../repositories/characters');
const { mockData } = require('../repositories/__mocks__/characters').CharactersRepository;
const { page, limit, incorrectLimit, notFoundId } = require('./__mocks__/mock-data');

const { mockCharacters, mockUnusedCount, mockCharacter } = mockData;
const endpoint = 'localhost:8080/v1/characters';

jest.mock('../repositories/characters');

describe('getCharacters', function () {
  it('should not call CharactersRepository.getCharacters if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(CharactersService.getCharacters(page, incorrectLimit, endpoint)).rejects.toThrow(
      BadRequestError
    );
    expect(CharactersRepository.getCharacters).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object, unusedCount and an array of characters', async function () {
    const { info, results, unusedCount } = await CharactersService.getCharacters(
      page,
      limit,
      endpoint
    );

    expect(info.total).toBe(mockCharacters.length);
    expect(unusedCount).toBe(mockUnusedCount);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockCharacters);
  });
});

describe('getCharacterById', function () {
  it('should throw BadRequestError if incorrect id provided', async function () {
    expect.assertions(2);
    await expect(CharactersService.getCharacterById('invalid id')).rejects.toThrow(BadRequestError);
    expect(CharactersRepository.getCharacterById).toHaveBeenCalledTimes(0);
  });

  it('should throw NotFoundError if character not found', async function () {
    expect.assertions(1);
    await expect(CharactersService.getCharacterById(notFoundId)).rejects.toThrow(NotFoundError);
  });

  it('should return character', async function () {
    const character = await CharactersService.getCharacterById(mockCharacter.id);
    expect(character).toStrictEqual(mockCharacter);
  });
});

describe('markCharacterAsUsed', function () {
  it('should return character marked as used', async function () {
    const character = await CharactersService.markCharacterAsUsed(mockCharacter.id);
    expect(character.unused).toBeFalsy();
  });
});
