const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { CardsService } = require('../services/cards');

const { defaultPage, defaultLimitPerPage } = config.server;

const getCards = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl;

  try {
    const cardsData = await CardsService.getCards(page, limit, endpoint);

    return res.status(httpStatusCodes.OK).json(cardsData);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  const { characterId } = req.body;

  try {
    const newCard = await CardsService.createCard(characterId, req.user);

    return res.status(httpStatusCodes.CREATED).json(newCard);
  } catch (error) {
    next(error);
  }
};

const changeOwner = async (req, res, next) => {
  const { cardId } = req.params;
  const { ownerId } = req.body;

  try {
    const cardData = await CardsService.changeOwner(cardId, ownerId);

    return res.status(httpStatusCodes.OK).json(cardData);
  } catch (error) {
    next(error);
  }
};

const getUserCards = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl + req.path;
  const { userId } = req.params;

  try {
    const cardsData = await CardsService.getUserCards(page, limit, endpoint, userId)

    return res.status(httpStatusCodes.OK).json(cardsData);
  } catch (error) {
    next(error);
  }
};

module.exports.CardsController = {
  getCards,
  getUserCards,
  createCard,
  changeOwner,
};
