const httpStatusCodes = require('../utils/http-status-codes');
const { TransactionService } = require('../services/transactions');
const { stripeErrorHandler } = require('../utils/stripe-error-handler');
const { StripeService } = require('../services/stripe');

const handlePayment = async (req, res, next) => {
  const { userId, amount, token } = req.body;

  try {
    await StripeService.handleStripePayment(token, amount);
    const response = await TransactionService.replenishBalance(userId, amount);

    return res.status(httpStatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    const currentError = stripeErrorHandler(error);
    next(currentError);
  }
};

const handleWithdrawal = async (req, res, next) => {
  const { userId, amount, token } = req.body;

  try {
    await StripeService.handleStripeWithdrawal(token, amount);
    // const response = await TransactionService.replenishBalance(userId, amount);

    return res.status(httpStatusCodes.OK).json({ msg: 'ok' });
  } catch (error) {
    console.log(error);
    const currentError = stripeErrorHandler(error);
    next(currentError);
  }
};

module.exports.PaymentsController = {
  handlePayment,
  handleWithdrawal,
};
