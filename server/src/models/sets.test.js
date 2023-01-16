const Set = require('./sets');
const { Model } = require('objection');

describe('Set model', function () {
  const set = new Set();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(set instanceof Model).toBeTruthy();
    expect(Set.tableName).toBe('sets');
    expect(typeof Set.relationMappings).toBe('object');
  });

  it('should have $formatJson method that returns object without extra data', function () {
    const baseData = { id: 1 };
    const returnedData = set.$formatJson({
      ...baseData,
      created_at: 'some date',
      deleted_at: 'some date',
    });

    expect(returnedData).toStrictEqual(baseData);
  });
});
