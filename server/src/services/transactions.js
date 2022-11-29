const config = require('../../config');
const { UserService } = require('./users');
const { TransactionRepository } = require('../repositories/transactions');
const { BadRequestError } = require('../utils/errors/api-errors');

const { defaultAdminUserName, systemFee } = config.server;

const createTransaction = async (lot) => {
  const {
    current_price, owner, lastPersonToBet
  } = lot;

  const transaction = await TransactionRepository.getTransaction('lot_id', lot.id);

  if (transaction) {
    throw new BadRequestError(['This lot already have transaction']);
  }

  const seller = owner
    ? owner
    : await UserService.getExistingUser('username', defaultAdminUserName);

  const transactionData = {
    lot_id: lot.id,
    seller_id: seller.id,
    purchaser_id: lastPersonToBet.id,
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

module.exports.TransactionService = {
  createTransaction,
  getUserBalance,
};
