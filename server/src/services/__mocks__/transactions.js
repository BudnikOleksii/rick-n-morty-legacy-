const mockUserBalance = {
  balance: 0,
};

module.exports.TransactionService = {
  getUserBalance: jest.fn(() => mockUserBalance),
  mockUserBalance,
};
