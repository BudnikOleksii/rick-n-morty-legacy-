const Card = require('./cards');
const { Model } = require('objection');

describe('Card model', function () {
  const card = new Card();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(card instanceof Model).toBeTruthy();
    expect(Card.tableName).toBe('cards');
    expect(typeof Card.relationMappings).toBe('object');
  });

  it('should have $formatJson method that returns object without extra data', function () {
    const baseData = { id: 1 };
    const returnedData = card.$formatJson({
      ...baseData,
      character_id: 1,
      owner_id: 2,
      created_at: 'some date',
      deleted_at: 'some date',
    });

    expect(returnedData).toStrictEqual(baseData);
  });
});
