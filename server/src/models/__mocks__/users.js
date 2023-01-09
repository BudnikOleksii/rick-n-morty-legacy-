const mockUser = { id: 1, name: 'first', unused: true };
const mockUser2 = { id: 2, name: 'second', unused: false };

class User {}

User.mockData = [mockUser, mockUser2];
User.id = 1;

User.query = jest.fn().mockReturnThis();
User.where = jest.fn(function (columnName, value) {
  this.mockData = this.mockData.filter((entity) => entity[columnName] === value);

  return this;
});
User.whereNotDeleted = jest.fn().mockReturnThis();
User.withGraphFetched = jest.fn().mockReturnThis();
User.insertAndFetch = jest.fn(function (data) {
  this.mockData.push({
    id: this.mockData.length + 1,
    ...data,
  });

  return this;
});
User.patch = jest.fn().mockReturnThis();
User.$relatedQuery = jest.fn().mockReturnThis();
User.relate = jest.fn().mockReturnThis();
User.unrelate = jest.fn().mockReturnThis();
User.page = jest.fn(function (page, limit) {
  const firstIndex = page * limit;
  const lastIndex = firstIndex + limit;
  return {
    results: this.mockData.filter((_, i) => i >= firstIndex && i <= lastIndex),
    total: this.mockData.length,
  };
});
User.first = jest.fn(function () {
  return this.mockData[0];
});
User.findById = jest.fn(function (id) {
  return this.mockData.find((entity) => entity.id === id);
});
User.deleteById = jest.fn(function (id) {
  const deleted = this.mockData.find((entity) => entity.id === id);

  return deleted ? 1 : 0;
});

module.exports = User;
