const { TransactionService } = require('./transactions');
const { TransactionRepository } = require('../repositories/transactions');
const { BadRequestError } = require('../utils/errors/api-errors');
const { systemFee } = require('../../config').server;
const { mockData, getUserCreditSum, getUserDebitSum } =
  require('../repositories/__mocks__/transactions').TransactionRepository;
const { mockLot, page, limit, incorrectLimit } = require('./__mocks__/mock-data');
const { StripeService } = require('./stripe');
const { mockTransaction, mockTransactions } = mockData;

jest.mock('../repositories/transactions');
jest.mock('../repositories/users');

const getBalanceInfo = (userId) => {
  const userDebitSum = getUserDebitSum(userId).debit;
  const { paid, feePaid } = getUserCreditSum(userId);
  const userCreditsSum = paid + feePaid;
  return {
    balance: userDebitSum - userCreditsSum,
    userDebitSum,
    userCreditsSum,
  };
};
const sellerId = mockTransaction.seller_id;
const purchaserId = mockTransaction.purchaser_id;
const endpoint = 'localhost:8080/v1/transactions';

describe('createTransaction', function () {
  it('should not create transaction and throw BadRequestError if transaction for current lot already exists', async function () {
    const lotWithTransaction = {
      ...mockLot,
      id: mockTransaction.lot_id,
    };

    expect.assertions(2);
    await expect(TransactionService.createTransaction(lotWithTransaction)).rejects.toThrow(
      BadRequestError
    );
    expect(TransactionRepository.createTransaction).toHaveBeenCalledTimes(0);
  });

  it('should create transaction and return it', async function () {
    const transaction = await TransactionService.createTransaction(mockLot);
    expect(transaction.lot_id).toBe(mockLot.id || null);
    expect(transaction.seller_id).toBe(mockLot.card.owner.id || null);
    expect(transaction.purchaser_id).toBe(mockLot.lastPersonToBet.id || null);
    expect(transaction.amount).toBe(mockLot.current_price);
    expect(transaction.system_fee).toBe(mockLot.current_price * systemFee);
  });

  it('should create transaction and return it, if no seller or purchaser this field have to be null', async function () {
    const testLot = {
      ...mockLot,
      lastPersonToBet: null,
    };
    testLot.card.owner = null;
    const transaction = await TransactionService.createTransaction(testLot);

    expect(transaction.lot_id).toBe(mockLot.id || null);
    expect(transaction.seller_id).toBeNull();
    expect(transaction.purchaser_id).toBeNull();
    expect(transaction.amount).toBe(mockLot.current_price);
    expect(transaction.system_fee).toBe(mockLot.current_price * systemFee);
  });
});

describe('getUserBalance', function () {
  it('should return user debit, credit and balance', async function () {
    const { balance, userCreditsSum, userDebitSum } = getBalanceInfo(sellerId);
    const balanceInfo = await TransactionService.getUserBalance(sellerId);
    expect(balanceInfo.balance).toBe(balance);
    expect(balanceInfo.userDebitSum).toBe(userDebitSum);
    expect(balanceInfo.userCreditsSum).toBe(userCreditsSum);
  });

  it('should return user debit, credit and balance', async function () {
    const { balance, userCreditsSum, userDebitSum } = getBalanceInfo(purchaserId);
    const balanceInfo = await TransactionService.getUserBalance(purchaserId);
    expect(balanceInfo.balance).toBe(balance);
    expect(balanceInfo.userDebitSum).toBe(userDebitSum);
    expect(balanceInfo.userCreditsSum).toBe(userCreditsSum);
  });
});

describe('getUserTransactions', function () {
  it('should not call TransactionRepository.getUserTransactions if user id is Nan and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(
      TransactionService.getUserTransactions(page, limit, endpoint, 'Nan')
    ).rejects.toThrow(BadRequestError);
    expect(TransactionRepository.getUserTransactions).toHaveBeenCalledTimes(0);
  });

  it('should not call TransactionRepository.getUserTransactions if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(
      TransactionService.getUserTransactions(page, incorrectLimit, endpoint, sellerId)
    ).rejects.toThrow(BadRequestError);
    expect(TransactionRepository.getUserTransactions).toHaveBeenCalledTimes(0);
  });

  it('should return results and total transactions count', async function () {
    const response = await TransactionService.getUserTransactions(page, limit, endpoint, sellerId);
    const { info, results } = response;

    expect(info.total).toBe(mockTransactions.length);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockTransactions);
  });
});

describe('replenishBalance', function () {
  it('should handleStripePayment, create and return transaction and return user', async function () {
    jest.spyOn(StripeService, 'handleStripePayment').mockImplementation(() => {});

    const { balance } = getBalanceInfo(sellerId);
    const amount = 100;
    const { transaction, user } = await TransactionService.replenishBalance(sellerId, amount);

    expect(StripeService.handleStripePayment).toBeCalled();
    expect(transaction.amount).toBe(amount);
    expect(transaction.seller_id).toBe(sellerId);
    expect(transaction.system_fee).toBe(0);
    expect(user.balance).toBe(balance);
  });
});

describe('withdraw', function () {
  it('should handleStripeWithdrawal, create and return transaction and return user', async function () {
    jest.spyOn(StripeService, 'handleStripeWithdrawal').mockImplementation(() => {});

    const { balance } = getBalanceInfo(sellerId);
    const amount = 100;
    const { transaction, user } = await TransactionService.withdraw(sellerId, amount);

    expect(StripeService.handleStripeWithdrawal).toBeCalled();
    expect(transaction.amount).toBe(amount);
    expect(transaction.purchaser_id).toBe(sellerId);
    expect(transaction.system_fee).toBe(amount * systemFee);
    expect(user.balance).toBe(balance);
  });
});
