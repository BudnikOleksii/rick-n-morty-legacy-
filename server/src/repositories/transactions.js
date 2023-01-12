const Transaction = require('../models/transactions');

const getTransaction = (columnName, value) => {
  return Transaction.query()
    .where(columnName, value)
    .withGraphFetched('[seller, purchaser]')
    .first();
};

const createTransaction = (payload) => {
  return Transaction.query().insertAndFetch(payload).withGraphFetched('[seller, purchaser]');
};

const getUserDebitSum = (userId) => {
  return Transaction.query().where('seller_id', userId).sum('amount as debit').first();
};

const getUserCreditSum = (userId) => {
  return Transaction.query()
    .where('purchaser_id', userId)
    .sum('amount as paid')
    .sum('system_fee as feePaid')
    .first();
};

const getUserTransactions = (page, limit, userId) => {
  return Transaction.query()
    .where('seller_id', userId)
    .orWhere('purchaser_id', userId)
    .orderBy('created_at', 'desc')
    .page(page - 1, limit);
};

module.exports.TransactionRepository = {
  getTransaction,
  createTransaction,
  getUserDebitSum,
  getUserCreditSum,
  getUserTransactions,
};
