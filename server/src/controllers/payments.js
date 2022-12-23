const httpStatusCodes = require('../utils/http-status-codes');
const { TransactionService } = require('../services/transactions');
const { stripeErrorHandler } = require('../utils/stripe-error-handler');
const { stripeSecretKey } = require('../../config').server;

const stripe = require('stripe')(stripeSecretKey);

const handlePayment = async (req, res, next) => {
  const { userId, amount, token } = req.body;

  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    const response = await TransactionService.replenishBalance(userId, amount);

    return res.status(httpStatusCodes.CREATED).json(response);
  } catch (error) {
    const currentError = stripeErrorHandler(error);
    next(currentError);
  }
};

module.exports.PaymentsController = {
  handlePayment,
};
