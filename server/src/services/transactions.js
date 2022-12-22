const config = require('../../config');
const { TransactionRepository } = require('../repositories/transactions');
const { BadRequestError } = require('../utils/errors/api-errors');
const { checkId } = require('../utils/check-id');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { createInfoData } = require('../utils/create-info-data');

const { systemFee } = config.server;

const createTransaction = async (lot) => {
  const { current_price, owner, lastPersonToBet } = lot;

  const transaction = await TransactionRepository.getTransaction('lot_id', lot.id);

  if (transaction) {
    throw new BadRequestError(['This lot already have transaction']);
  }

  const transactionData = {
    lot_id: lot?.id || null,
    seller_id: owner?.id || null,
    purchaser_id: lastPersonToBet?.id || null,
    amount: current_price,
    system_fee: current_price * systemFee,
  };

  return TransactionRepository.createTransaction(transactionData);
};

const getUserBalance = async (userId) => {
  const userDebitSum = (await TransactionRepository.getUserDebitSum(userId)).debit || 0;
  const userCredits = await TransactionRepository.getUserCreditSum(userId);
  const userCreditsSum = (userCredits.paid || 0) + (userCredits.feePaid || 0);

  return {
    balance: userDebitSum - userCreditsSum,
    userDebitSum,
    userCreditsSum,
  };
};

const getUserTransactions = async (page, limit, endpoint, userId) => {
  checkId(userId);
  checkLimitForRequest(limit, 'transactions');
  const { results, total } = await TransactionRepository.getUserTransactions(page, limit, userId);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const replenishBalance = (userId, amount) => {
  return TransactionRepository.createTransaction({
    seller_id: userId,
    amount,
    system_fee: 0,
  });
};

module.exports.TransactionService = {
  createTransaction,
  getUserBalance,
  getUserTransactions,
  replenishBalance,
};
