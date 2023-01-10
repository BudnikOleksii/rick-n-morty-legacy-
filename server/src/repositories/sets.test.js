const Set = require('../models/sets');
const MockBaseModel = require('../models/__mocks__/base-model');
const { SetsRepository } = require('./sets');

jest.mock('../models/base-model');

const testColumnName = 'id';
const testId = 1;
const testNotFoundId = 11;
const testSet = MockBaseModel.mockData.find((set) => set[testColumnName] === testId);
const testNewSetName = 'new set';

describe('getSets', function () {
  it('should return results and total sets count', async function () {
    const { results, total } = await SetsRepository.getSets(1, 20);
    expect(results).toStrictEqual(MockBaseModel.mockData);
    expect(total).toBe(MockBaseModel.mockData.length);
  });
});

describe('getAllSets', function () {
  it('should return all sets query', function () {
    const sets = SetsRepository.getAllSets();

    expect(sets.mockData).toStrictEqual(MockBaseModel.mockData);
  });
});

describe('getSetsInfo', function () {
  it('should return total sets count', async function () {
    const { total } = await SetsRepository.getSetsInfo();

    expect(total).toBe(MockBaseModel.mockData.length);
  });
});

describe('getSet', function () {
  it('should return set if found', function () {
    const set = SetsRepository.getSet(testColumnName, testId);
    expect(set).toStrictEqual(testSet);
  });

  it('should return undefined if set not found', function () {
    const set = SetsRepository.getSet(testColumnName, testNotFoundId);
    expect(set).toBeUndefined();
  });
});

describe('createSet', function () {
  it('should add new set', function () {
    const sets = SetsRepository.createSet(testNewSetName);
    expect(sets.mockResults.name).toBe(testNewSetName);
  });
});

describe('deleteSet', function () {
  it('should return numbers of deleted sets', function () {
    const deletedCount = SetsRepository.deleteSet(testId);
    expect(deletedCount).toBe(1);
  });

  it('should return 0 if nothing to delete', function () {
    const deletedCount = SetsRepository.deleteSet(testNotFoundId);
    expect(deletedCount).toBe(0);
  });
});

describe('addCharacterToSet', function () {
  it('should relate character with methods $relatedQuery and relate, and return set', async function () {
    const set = await SetsRepository.addCharacterToSet(Set, MockBaseModel);

    expect(Set.$relatedQuery).toBeCalled();
    expect(Set.relate).toBeCalled();
    expect(set).toStrictEqual(testSet);
  });
});

describe('removeCharacterFromSet', function () {
  it('should unrelate character with methods $relatedQuery and unrelate and return set', async function () {
    const set = await SetsRepository.removeCharacterFromSet(Set, MockBaseModel);

    expect(Set.$relatedQuery).toBeCalled();
    expect(Set.unrelate).toBeCalled();
    expect(set).toStrictEqual(testSet);
  });
});
