const express = require('express');
const { CardsController } = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/', CardsController.getCards);

module.exports = cardsRouter;
