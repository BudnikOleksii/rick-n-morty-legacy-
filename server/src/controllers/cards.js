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

module.exports.CardsController = {
  getCards,
};
