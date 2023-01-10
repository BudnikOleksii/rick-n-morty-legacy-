const MockBaseModel = require('../models/__mocks__/base-model');
const { CharactersRepository } = require('./characters');

jest.mock('../models/base-model');

const testId = 1;
const testSet = MockBaseModel.mockData.find((set) => set.id === testId);

describe('getCards', function () {
  it('should return results and total characters count', function () {
    const { results, total } = CharactersRepository.getCharacters(1, 20);
    expect(results).toStrictEqual(MockBaseModel.mockData);
    expect(total).toBe(MockBaseModel.mockData.length);
  });
});
