let returnValue = null;

const mockEntity = { id: 1, name: 'first', unused: true };
const mockEntity2 = { id: 2, name: 'second', unused: false };

class BaseModel {}

/**
 * Sets return value on thenable module.
 * @param {*} value
 */
BaseModel.mockReturnValue = (value) => {
  returnValue = value;
};
BaseModel.mockData = [mockEntity, mockEntity2];
BaseModel.mockResults = [mockEntity, mockEntity2];
BaseModel.id = 1;

BaseModel.query = jest.fn(function () {
  this.mockResults = this.mockData;
  return this;
});
BaseModel.where = jest.fn(function (columnName, value) {
  if (arguments.length === 3) {
    return this;
  }
  this.mockResults = this.mockData.filter((entity) => entity[columnName] === value);

  return this;
});
BaseModel.orWhere = jest.fn(function (columnName, value) {
  const prevResults = this.mockResults;
  const newResults = this.mockData.filter((entity) => entity[columnName] === value);
  this.mockResults = [...prevResults, newResults];

  return this;
});
BaseModel.whereNotDeleted = jest.fn().mockReturnThis();
BaseModel.whereExists = jest.fn().mockReturnThis();
BaseModel.whereBetween = jest.fn().mockReturnThis();
BaseModel.withGraphFetched = jest.fn().mockReturnThis();
BaseModel.insert = jest.fn().mockReturnThis();
BaseModel.insertAndFetch = jest.fn(function (data) {
  this.mockResults = {
    id: this.mockData.length + 1,
    ...data,
  };

  return this;
});
BaseModel.patchAndFetchById = jest.fn(function (id, data) {
  const entity = this.findById(id);
  this.mockResults = {
    ...entity,
    ...data,
  };

  return this;
});
BaseModel.orderBy = jest.fn().mockReturnThis();
BaseModel.$relatedQuery = jest.fn().mockReturnThis();
BaseModel.relatedQuery = jest.fn().mockReturnThis();
BaseModel.relate = jest.fn().mockReturnThis();
BaseModel.unrelate = jest.fn().mockReturnThis();
BaseModel.startTransaction = jest.fn();
BaseModel.page = jest.fn(function (page, limit) {
  const firstIndex = page * limit;
  const lastIndex = firstIndex + limit;
  return {
    results: this.mockData.filter((_, i) => i >= firstIndex && i <= lastIndex),
    total: this.mockData.length,
  };
});
BaseModel.min = jest.fn(function (columnNameWithAlias) {
  const columnName = columnNameWithAlias.split(' ')[0];
  let min = Infinity;
  this.mockData.forEach((entity) => {
    if (entity[columnName] < min) {
      min = entity[columnName];
    }
  });

  this.mockResults[0] = {
    ...this.mockResults[0],
    min,
  };

  return this;
});
BaseModel.max = jest.fn(function (columnNameWithAlias) {
  const columnName = columnNameWithAlias.split(' ')[0];
  let max = -Infinity;
  this.mockData.forEach((entity) => {
    if (entity[columnName] > max) {
      max = entity[columnName];
    }
  });

  this.mockResults[0] = {
    ...this.mockResults[0],
    max,
  };

  return this;
});
BaseModel.sum = jest.fn(function (columnNameWithAlias) {
  const columnName = columnNameWithAlias.split(' ')[0];
  const prevResults = this.mockResults[0];
  const prevSum = prevResults.sum || 0;
  const sum = prevSum + this.mockResults.reduce((acc, entity) => acc + entity[columnName], 0);
  this.mockResults[0] = {
    ...prevResults,
    sum,
  };

  return this;
});
BaseModel.first = jest.fn(function () {
  return this.mockResults[0];
});
BaseModel.findOne = jest.fn(function (columnName, value) {
  return this.mockData.find((entity) => entity[columnName] === value);
});
BaseModel.findById = jest.fn(function (id) {
  this.mockResults = this.mockData.find((entity) => entity.id === id);

  return this;
});
BaseModel.deleteById = jest.fn(function (id) {
  const deleted = this.mockData.find((entity) => entity.id === id);

  return deleted ? 1 : 0;
});
BaseModel.delete = jest.fn().mockReturnThis();
BaseModel.resultSize = jest.fn(function () {
  return this.mockData.length;
});
BaseModel.then = jest.fn((done) => {
  done(returnValue);
});

module.exports = BaseModel;
