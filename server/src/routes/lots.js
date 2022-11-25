const express = require('express');
const { authGuard } = require('../middlewares/authGuard');
const { LotsController } = require('../controllers/lots');
const { newLotValidations } = require('../validations/lots');

const lotsRouter = express.Router();

lotsRouter.use(authGuard);
lotsRouter.get('/', LotsController.getLots);
lotsRouter.get('/:id', LotsController.getLotById);
lotsRouter.post('/', newLotValidations, LotsController.createLot);
lotsRouter.patch('/:id', LotsController.handleBet);

module.exports = lotsRouter;
