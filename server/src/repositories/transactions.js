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

module.exports.TransactionRepository = {
  getTransaction,
  createTransaction,
};
