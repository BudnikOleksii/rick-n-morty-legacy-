let returnValue = null;

class BaseModel {}

/**
 * Sets return value on thenable module.
 * @param {*} value
 */
BaseModel.mockReturnValue = (value) => {
  returnValue = value;
};

BaseModel.query = jest.fn().mockReturnThis();
BaseModel.where = jest.fn().mockReturnThis();
BaseModel.whereNotDeleted = jest.fn().mockReturnThis();
BaseModel.withGraphFetched = jest.fn().mockReturnThis();
BaseModel.findById = jest.fn().mockReturnThis();
BaseModel.insert = jest.fn().mockReturnThis();
BaseModel.insertAndFetch = jest.fn().mockReturnThis();
BaseModel.patchAndFetchById = jest.fn().mockReturnThis();
BaseModel.orderBy = jest.fn().mockReturnThis();
BaseModel.$relatedQuery = jest.fn().mockReturnThis();
BaseModel.relate = jest.fn().mockReturnThis();
BaseModel.unrelate = jest.fn().mockReturnThis();
BaseModel.startTransaction = jest.fn();
BaseModel.page = jest.fn();
BaseModel.first = jest.fn();
BaseModel.findOne = jest.fn();
BaseModel.deleteById = jest.fn();
BaseModel.resultSize = jest.fn();
BaseModel.then = jest.fn((done) => {
  done(returnValue);
});

module.exports = BaseModel;
