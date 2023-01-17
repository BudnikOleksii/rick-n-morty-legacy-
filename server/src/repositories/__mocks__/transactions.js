const mockTransaction = {
  id: 1,
  lot_id: 1,
  seller_id: 1,
  purchaser_id: 2,
  amount: 100,
  system_fee: 10,
};
const mockTransaction2 = {
  id: 2,
  lot_id: 2,
  seller_id: 1,
  purchaser_id: 2,
  amount: 100,
  system_fee: 10,
};
const mockTransactions = [mockTransaction, mockTransaction2];
const mockTransactionFromDB = {
  results: mockTransactions,
  total: mockTransactions.length,
};

const getTransaction = jest.fn((columnName, value) =>
  mockTransactions.find((token) => token[columnName] === value)
);

module.exports.TransactionRepository = {
  getTransaction,
  createTransaction: jest.fn((payload) => payload),
  getUserDebitSum: jest.fn((userId) => ({
    debit: mockTransactions
      .filter((tr) => tr.seller_id === userId)
      .reduce((acc, tr) => acc + tr.amount, 0),
  })),
  getUserCreditSum: jest.fn((userId) => {
    const transactions = mockTransactions.filter((tr) => tr.purchaser_id === userId);
    return {
      paid: transactions.reduce((acc, tr) => acc + tr.amount, 0),
      feePaid: transactions.reduce((acc, tr) => acc + tr.system_fee, 0),
    };
  }),
  getUserTransactions: jest.fn(() => mockTransactionFromDB),

  mockData: {
    mockTransaction,
    mockTransactions,
  },
};
