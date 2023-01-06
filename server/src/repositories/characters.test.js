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

describe('getCharacterById', function () {
  it('should call query builder methods withGraphFetched and findById', function () {
    CharactersRepository.getCharacterById();

    expect(Character.query).toBeCalled();
    expect(Character.withGraphFetched).toBeCalled();
    expect(Character.findById).toBeCalled();
  });
});

describe('countUnused', function () {
  it('should call query builder methods where and resultSize', function () {
    CharactersRepository.countUnused();

    expect(Character.query).toBeCalled();
    expect(Character.where).toBeCalled();
    expect(Character.resultSize).toBeCalled();
  });
});

describe('markCharacterAsUsed', function () {
  it('should call query builder method patchAndFetchById', function () {
    CharactersRepository.markCharacterAsUsed();

    expect(Character.query).toBeCalled();
    expect(Character.patchAndFetchById).toBeCalled();
  });
});
