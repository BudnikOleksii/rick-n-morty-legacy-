const Episode = require('./episodes');
const { Model } = require('objection');

describe('Episode model', function () {
  const episode = new Episode();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(episode instanceof Model).toBeTruthy();
    expect(Episode.tableName).toBe('episodes');
    expect(typeof Episode.relationMappings).toBe('object');
  });

  it('should have $formatJson method that returns object without extra data', function () {
    const baseData = { id: 1 };
    const returnedData = episode.$formatJson({
      ...baseData,
      created_at: 'some date',
      deleted_at: 'some date',
    });

    expect(returnedData).toStrictEqual(baseData);
  });
});
