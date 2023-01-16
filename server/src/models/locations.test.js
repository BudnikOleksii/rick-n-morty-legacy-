const Location = require('./locations');
const { Model } = require('objection');

describe('Location model', function () {
  const location = new Location();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(location instanceof Model).toBeTruthy();
    expect(Location.tableName).toBe('locations');
    expect(typeof Location.relationMappings).toBe('object');
  });

  it('should have $formatJson method that returns object without extra data', function () {
    const baseData = { id: 1 };
    const returnedData = location.$formatJson({
      ...baseData,
      created_at: 'some date',
      deleted_at: 'some date',
    });

    expect(returnedData).toStrictEqual(baseData);
  });
});
