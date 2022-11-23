const express = require('express');
const { authenticationGuard } = require('../middlewares/authenticationGuard');
const { LotsController } = require('../controllers/lots');
const { newLotValidations } = require('../validations/lots');

const lotsRouter = express.Router();

lotsRouter.use(authenticationGuard);
lotsRouter.get('/', LotsController.getLots);
lotsRouter.post('/', newLotValidations, LotsController.createLot);
lotsRouter.patch('/:id', LotsController.handleBet);

module.exports = lotsRouter;
