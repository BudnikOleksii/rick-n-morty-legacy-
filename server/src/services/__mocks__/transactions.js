const mockUserBalance = {
  balance: 100,
};

module.exports.TransactionService = {
  getUserBalance: jest.fn(() => mockUserBalance),
  mockUserBalance,
};
