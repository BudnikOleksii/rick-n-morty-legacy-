const express = require('express');
const config = require('../../config');
const { CardsController } = require('../controllers/cards');
const { authMiddleware } = require('../middlewares/auth');

const cardsRouter = express.Router();

const authorisedRoles = config.server.authorisedRoles;

cardsRouter.use(authMiddleware(authorisedRoles));
cardsRouter.get('/', CardsController.getCards);
cardsRouter.get('/user/:userId', CardsController.getUserCards);
cardsRouter.post('/', CardsController.createCard);
cardsRouter.patch('/:cardId', CardsController.changeOwner);

module.exports = cardsRouter;
