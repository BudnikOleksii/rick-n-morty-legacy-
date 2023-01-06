const Character = require('../models/characters');
const { CharactersRepository } = require('./characters');

jest.mock('../models/base-model');

describe('getCharacters', function () {
  it('should call query builder methods withGraphFetched and page', function () {
    CharactersRepository.getCharacters();

    expect(Character.query).toBeCalled();
    expect(Character.withGraphFetched).toBeCalled();
    expect(Character.page).toBeCalled();
  });
});
