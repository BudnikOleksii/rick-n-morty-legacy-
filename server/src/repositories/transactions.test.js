const Transaction = require('../models/__mocks__/transactions');
const { TransactionRepository } = require('./transactions');

jest.mock('../models/transactions');

describe('getTransaction', function () {
  it('should return transaction found by column value', function () {
    const transaction = TransactionRepository.getTransaction('id', Transaction.mockTransaction.id);
    expect(transaction).toStrictEqual(Transaction.mockTransaction);
  });
});

describe('createTransaction', function () {
  const payload = { amount: 200 };
  it('should return query with new transaction', function () {
    const transactionQuery = TransactionRepository.createTransaction(payload);
    expect(transactionQuery.mockResults.amount).toStrictEqual(payload.amount);
  });
});

describe('getUserDebitSum', function () {
  it('should return sum of user debit transactions', function () {
    const result = TransactionRepository.getUserDebitSum(Transaction.mockTransaction.seller_id);
    expect(result.sum).toBe(Transaction.mockTransaction.amount);
  });
});

describe('getUserCreditSum', function () {
  const userPaid = Transaction.mockTransaction.amount + Transaction.mockTransaction.system_fee;

  it('should return sum of user credit transactions plus system fee paid', function () {
    const result = TransactionRepository.getUserCreditSum(Transaction.mockTransaction.purchaser_id);
    expect(result.sum).toBe(userPaid);
  });
});

describe('getUserTransactions', function () {
  it('should return user transactions', function () {
    const { results, total } = TransactionRepository.getUserTransactions(
      1,
      20,
      Transaction.mockTransaction.seller_id
    );
    expect(results).toStrictEqual(Transaction.mockData);
    expect(total).toStrictEqual(Transaction.mockData.length);
  });
});
