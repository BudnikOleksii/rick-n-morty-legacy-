const Character = require('../models/characters');
const MockBaseModel = require('../models/__mocks__/base-model');
const { CharactersRepository } = require('./characters');

jest.mock('../models/base-model');

const testId = 1;
const testSet = MockBaseModel.mockData.find((set) => set.id === testId);

describe('getCharacters', function () {
  it('should results and total characters count', function () {
    const { results, total } = CharactersRepository.getCharacters(1, 20);
    expect(results).toStrictEqual(MockBaseModel.mockData);
    expect(total).toBe(MockBaseModel.mockData.length);
  });
});

describe('getCharacterById', function () {
  it('should call query builder methods withGraphFetched and findById', function () {
    const character = CharactersRepository.getCharacterById(testId);
    expect(character).toStrictEqual(testSet);
  });
});

describe('markCharacterAsUsed', function () {
  it('should return updated character, unused === false', function () {
    const updatedCharacter = CharactersRepository.markCharacterAsUsed(testId);
    expect(updatedCharacter.unused).toBeFalsy();
  });
});

describe('countUnused', function () {
  it('should return number of unused characters', function () {
    const unusedCount = CharactersRepository.countUnused();
    expect(unusedCount).toBe(1);
  });
});
