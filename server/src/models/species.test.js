const Species = require('./species');
const { Model } = require('objection');

describe('Species model', function () {
  const species = new Species();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(species instanceof Model).toBeTruthy();
    expect(Species.tableName).toBe('species');
    expect(typeof Species.relationMappings).toBe('object');
  });
});
