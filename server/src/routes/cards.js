const express = require('express');
const config = require('../../config');
const { CardsController } = require('../controllers/cards');
const { authenticationGuard } = require('../middlewares/authenticationGuard');
const { roleGuard } = require('../middlewares/roleGuard');

const cardsRouter = express.Router();

const { adminRole } = config.server;

cardsRouter.use(authenticationGuard);
cardsRouter.get('/', CardsController.getCards);
cardsRouter.get('/:id', CardsController.getCardById);
cardsRouter.post('/', roleGuard(adminRole), CardsController.createCard);
cardsRouter.patch('/:cardId', CardsController.changeOwner);

module.exports = cardsRouter;
