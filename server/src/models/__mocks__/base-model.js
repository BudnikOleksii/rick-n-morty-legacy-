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
BaseModel.id = 1;

BaseModel.query = jest.fn().mockReturnThis();
BaseModel.where = jest.fn(function (columnName, value) {
  this.mockData = this.mockData.filter((entity) => entity[columnName] === value);

  return this;
});
BaseModel.whereNotDeleted = jest.fn().mockReturnThis();
BaseModel.withGraphFetched = jest.fn().mockReturnThis();
BaseModel.insert = jest.fn().mockReturnThis();
BaseModel.insertAndFetch = jest.fn(function (data) {
  this.mockData.push({
    id: this.mockData.length + 1,
    ...data,
  });

  return this;
});
BaseModel.patchAndFetchById = jest.fn(function (id, data) {
  const entity = this.findById(id);
  return {
    ...entity,
    ...data,
  };
});
BaseModel.orderBy = jest.fn().mockReturnThis();
BaseModel.$relatedQuery = jest.fn().mockReturnThis();
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
BaseModel.first = jest.fn();
BaseModel.findOne = jest.fn(function (columnName, value) {
  return this.mockData.find((entity) => entity[columnName] === value);
});
BaseModel.findById = jest.fn(function (id) {
  return this.mockData.find((entity) => entity.id === id);
});
BaseModel.deleteById = jest.fn(function (id) {
  const deleted = this.mockData.find((entity) => entity.id === id);

  return deleted ? 1 : 0;
});
BaseModel.resultSize = jest.fn(function () {
  return this.mockData.length;
});
BaseModel.then = jest.fn((done) => {
  done(returnValue);
});

module.exports = BaseModel;