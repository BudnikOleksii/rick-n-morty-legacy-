const Lot = require('./lots');
const { Model } = require('objection');

describe('Lot model', function () {
  const lot = new Lot();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(lot instanceof Model).toBeTruthy();
    expect(Lot.tableName).toBe('lots');
    expect(typeof Lot.relationMappings).toBe('object');
  });

  it('should have $formatJson method that returns object without extra data', function () {
    const baseData = { id: 1 };
    const returnedData = lot.$formatJson({
      ...baseData,
      card_id: 2,
      last_person_to_bet_id: 2,
    });

    expect(returnedData).toStrictEqual(baseData);
  });
});
