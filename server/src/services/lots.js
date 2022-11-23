const config = require('../../config');
const { BadRequestError, ForbiddenError } = require('../utils/errors/api-errors');
const { createInfoData } = require('../utils/create-info-data');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { LotsRepository } = require('../repositories/lots');
const { checkId } = require('../utils/check-id');
const { CardsService } = require('./cards');
const { generateDefaultEndDate } = require('../utils/generate-default-end-date');
const { UserService } = require('./users');

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

  return LotsRepository.getLot('id', id);
};

const createLot = async (body, tokenData) => {
  const {
    cardId, initialPrice, endDate, minActionDuration, minStep, maxPrice
  } = body;

  const card = await CardsService.getCardById(cardId);
  let canStarAuction;

  if (card.owner) {
    canStarAuction = card.owner.id === tokenData.id;
  } else {
    canStarAuction = tokenData.roles.some(role => role.title === 'admin');
  }

  if (!canStarAuction) {
    throw new ForbiddenError(['Auction can start only card owner!']);
  }

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

const finishAuction = async (lot) => {
  const { card, lastPersonToBet } = lot;
  // TODO
  // 1) relate new owner or keep current if no one bet
  if (lastPersonToBet) {
    const updatedCard = await CardsService.changeOwner(card.id, lastPersonToBet.id);
  }
  // 2) Mark character as used!!!
  // 3) create transaction if needed
  // 4) Remove auction(change activated to false)
};

const handleBet = async (lotId, bet, tokenData) => {
  if (isNaN(Number(bet)) || !Number(bet)) {
    throw new BadRequestError(['Incorrect bet']);
  }

  const lot = await getLotById(lotId);

  if (new Date() > lot.end_date) {
    const finishedAuction = await finishAuction(lot);
    throw new BadRequestError(['Current auction already finished']);
  }

  if (lot.card.owner?.id === tokenData.id) {
    throw new BadRequestError(['You cannot bet for yours lot!']);
  }

  if (lot.current_price >= bet || bet > lot.max_price) {
    throw new BadRequestError(['Bet must be more than previous and less than max price']);
  }

  const currentStep = bet - lot.current_price;

  if (currentStep < lot.min_step) {
    throw new BadRequestError(['Bet step must be more than minimum']);
  }

  // TODO check time for deadline, if less than min_auction_duration update it

  const user = await UserService.getUserById(tokenData.id);

  return LotsRepository.updateLot(lotId, user, {
    current_price: bet
  });
};

module.exports.LotsService = {
  getLots,
  getLotById,
  createLot,
  handleBet,
};
