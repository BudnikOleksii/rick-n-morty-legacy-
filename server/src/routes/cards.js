const express = require('express');
const config = require('../../config');
const { CardsController } = require('../controllers/cards');
const { authGuard } = require('../middlewares/auth-guard');
const { roleGuard } = require('../middlewares/role-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const cardsRouter = express.Router();

const { adminRole } = config.server;

cardsRouter.use(authGuard);
cardsRouter.use(updateLastVisitDate);
cardsRouter.get('/', CardsController.getCards);
cardsRouter.get('/:id', CardsController.getCardById);
cardsRouter.post('/', roleGuard(adminRole), CardsController.createCard);
cardsRouter.patch('/:cardId', CardsController.changeOwner);

module.exports = cardsRouter;
