const httpStatusCodes = require('../utils/http-status-codes');
const { TransactionService } = require('../services/transactions');

const handlePayment = async (req, res, next) => {
  const { userId, amount } = req.body;

  try {
    const transaction = await TransactionService.replenishBalance(userId, amount);

    return res.status(httpStatusCodes.CREATED).json(transaction);
  } catch (error) {
    next(error);
  }
};

module.exports.PaymentsController = {
  handlePayment,
};
