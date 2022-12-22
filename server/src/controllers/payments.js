const httpStatusCodes = require('../utils/http-status-codes');
const { TransactionService } = require('../services/transactions');
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
    next(error);
  }
};

module.exports.PaymentsController = {
  handlePayment,
};
