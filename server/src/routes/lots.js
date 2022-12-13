const express = require('express');
const { authGuard } = require('../middlewares/auth-guard');
const { LotsController } = require('../controllers/lots');
const { newLotValidations } = require('../validations/lots');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const lotsRouter = express.Router();

lotsRouter.use(authGuard);
lotsRouter.use(updateLastVisitDate);
lotsRouter.get('/', LotsController.getLots);
lotsRouter.get('/prices', LotsController.getLotsPriceRange);
lotsRouter.get('/:id', LotsController.getLotById);
lotsRouter.post('/', newLotValidations, LotsController.createLot);
lotsRouter.patch('/:id', LotsController.handleBet);

module.exports = lotsRouter;
