const MockBaseModel = require('./base-model');

const mockSellerId = 1;
const mockPurchaseId = 2;
const mockAmount = 100;
const mockTransaction = {
  id: 1,
  seller_id: mockSellerId,
  purchaser_id: mockPurchaseId,
  amount: mockAmount,
  system_fee: mockAmount * 0.1,
};

class Transaction extends MockBaseModel {}

Transaction.mockData = [mockTransaction];
Transaction.mockResults = [mockTransaction];
Transaction.mockTransaction = mockTransaction;

module.exports = Transaction;
