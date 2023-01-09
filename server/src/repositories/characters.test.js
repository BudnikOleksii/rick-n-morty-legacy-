const Character = require('../models/characters');
const { CharactersRepository } = require('./characters');

jest.mock('../models/base-model');

const mockId = 1;

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
    CharactersRepository.getCharacterById(mockId);

    expect(Character.query).toBeCalled();
    expect(Character.withGraphFetched).toBeCalled();
    expect(Character.findById).toBeCalledWith(mockId);
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
  const unused = { unused: false };

  it('should call query builder method patchAndFetchById', function () {
    CharactersRepository.markCharacterAsUsed(mockId);

    expect(Character.query).toBeCalled();
    expect(Character.patchAndFetchById).toBeCalledWith(mockId, unused);
  });
});
