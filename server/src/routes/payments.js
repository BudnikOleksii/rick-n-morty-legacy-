const express = require('express');
const { authGuard } = require('../middlewares/auth-guard');
const { PaymentsController } = require('../controllers/payments');

const paymentsRouter = express.Router();

paymentsRouter.use(authGuard);
paymentsRouter.post('/payment', PaymentsController.handlePayment);

module.exports = paymentsRouter;
