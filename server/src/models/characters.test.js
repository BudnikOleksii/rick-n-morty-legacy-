const Character = require('./characters');
const { Model } = require('objection');

describe('Character model', function () {
  const character = new Character();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(character instanceof Model).toBeTruthy();
    expect(Character.tableName).toBe('characters');
    expect(typeof Character.relationMappings).toBe('object');
  });
});
