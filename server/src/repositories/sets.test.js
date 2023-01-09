const Set = require('../models/sets');
const BaseModel = require('../models/base-model');
const { SetsRepository } = require('./sets');

jest.mock('../models/base-model');

describe('getSets', function () {
  it('should call query builder methods withGraphFetched and page', function () {
    SetsRepository.getSets();

    expect(Set.query).toBeCalled();
    expect(Set.withGraphFetched).toBeCalled();
    expect(Set.page).toBeCalled();
  });
});

describe('getAllSets', function () {
  it('should call query builder method withGraphFetched', function () {
    SetsRepository.getAllSets();

    expect(Set.query).toBeCalled();
    expect(Set.withGraphFetched).toBeCalled();
  });
});

describe('getSet', function () {
  const columnName = 'id';
  const value = 1;

  it('should call query builder methods withGraphFetched and findOne', function () {
    SetsRepository.getSet(columnName, value);

    expect(Set.query).toBeCalled();
    expect(Set.withGraphFetched).toBeCalled();
    expect(Set.findOne).toBeCalledWith(columnName, value);
  });
});

describe('createSet', function () {
  it('should call query builder method insertAndFetch', function () {
    SetsRepository.createSet();

    expect(Set.query).toBeCalled();
    expect(Set.insertAndFetch).toBeCalled();
  });
});

describe('deleteSet', function () {
  const id = 1;

  it('should call query builder method deleteById', function () {
    SetsRepository.deleteSet(id);

    expect(Set.query).toBeCalled();
    expect(Set.deleteById).toBeCalledWith(id);
  });
});

describe('addCharacterToSet', function () {
  it('should relate character with methods $relatedQuery and relate', function () {
    SetsRepository.addCharacterToSet(Set, BaseModel);

    expect(Set.$relatedQuery).toBeCalled();
    expect(Set.relate).toBeCalled();
  });
});

describe('removeCharacterFromSet', function () {
  it('should unrelate character with methods $relatedQuery and unrelate', function () {
    SetsRepository.removeCharacterFromSet(Set, BaseModel);

    expect(Set.$relatedQuery).toBeCalled();
    expect(Set.unrelate).toBeCalled();
  });
});

describe('getSetsInfo', function () {
  it('should call resultSize method', function () {
    SetsRepository.getSetsInfo();

    expect(Set.query).toBeCalled();
    expect(Set.resultSize).toBeCalled();
  });
});
