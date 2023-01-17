const Type = require('./types');
const { Model } = require('objection');

describe('Type model', function () {
  const type = new Type();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(type instanceof Model).toBeTruthy();
    expect(Type.tableName).toBe('types');
    expect(typeof Type.relationMappings).toBe('object');
  });
});
