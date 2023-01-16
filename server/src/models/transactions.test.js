const Transaction = require('./transactions');
const { Model } = require('objection');

describe('Transaction model', function () {
  const transaction = new Transaction();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(transaction instanceof Model).toBeTruthy();
    expect(Transaction.tableName).toBe('transactions');
    expect(typeof Transaction.relationMappings).toBe('object');
  });
});
