const Transaction = require('../models/transactions');

const getTransaction = (columnName, value) => {
  return Transaction.query()
    .where(columnName, value)
    .withGraphFetched('[seller, purchaser]')
    .first();
};

const createTransaction = async (payload) => {
  const transaction = await Transaction.query().insertAndFetch(payload);

  return getTransaction('id', transaction.id);
};

const getUserDebitSum = (userId) => {
  return Transaction.query()
    .where('seller_id', userId)
    .sum('amount as debit')
    .first();
};

const getUserCreditSum = (userId) => {
  return Transaction.query()
    .where('purchaser_id', userId)
    .sum('amount as paid')
    .sum('system_fee as feePaid')
    .first();
};

module.exports.TransactionRepository = {
  getTransaction,
  createTransaction,
  getUserDebitSum,
  getUserCreditSum,
};
