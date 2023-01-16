const Token = require('./tokens');
const { Model } = require('objection');

describe('Token model', function () {
  const token = new Token();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(token instanceof Model).toBeTruthy();
    expect(Token.tableName).toBe('tokens');
    expect(typeof Token.relationMappings).toBe('object');
  });

  it('should have $formatJson method that returns object without extra data', function () {
    const baseData = { id: 1 };
    const returnedData = token.$formatJson({
      ...baseData,
      created_at: 'some date',
      updated_at: 'some date',
    });

    expect(returnedData).toStrictEqual(baseData);
  });

  it('should set date to our token updated_at field', function () {
    token.$beforeUpdate();
    expect(token.updated_at.getDate()).toBe(new Date().getDate());
  });
});
