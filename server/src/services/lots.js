const config = require('../../config');
const { BadRequestError } = require('../utils/errors/api-errors');
const { createInfoData } = require('../utils/create-info-data');
const { verifyPermission } = require('../utils/verify-permission');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { LotsRepository } = require('../repositories/lots');
const { checkId } = require('../utils/check-id');
const { CardsService } = require('./cards');
const { generateDefaultEndDate } = require('../utils/generate-default-end-date');

const {
  defaultInitialPrice, defaultMinActionDuration, defaultMinStep, defaultMaxPrice
} = config.server;

const getLots = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'lots');
  const { results, total } = await LotsRepository.getLots(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getLotById = async (id) => {
  checkId(id);
};

const createLot = async (body, tokenData) => {
  const {
    cardId, initialPrice, endDate, minActionDuration, minStep, maxPrice
  } = body;

  const card = await CardsService.getCardById(cardId);
  // only card owner or admin can start auction
  verifyPermission(tokenData, card.owner?.id);

  const candidate = await LotsRepository.getLot('card_id', cardId);

  if (candidate) {
    throw new BadRequestError(['Current card already in auction']);
  }

  const currentPrice = initialPrice || defaultInitialPrice;

  const payload = {
    card_id: cardId,
    initial_price: currentPrice,
    current_price: currentPrice,
    end_date: endDate ? new Date(endDate) : generateDefaultEndDate(),
    min_action_duration: minActionDuration || defaultMinActionDuration,
    min_step: minStep || defaultMinStep,
    max_price: maxPrice || defaultMaxPrice,
  };

  return LotsRepository.createLot(payload);
};

module.exports.LotsService = {
  getLots,
  getLotById,
  createLot,
};
