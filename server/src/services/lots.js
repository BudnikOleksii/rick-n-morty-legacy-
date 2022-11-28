const config = require('../../config');
const { BadRequestError, ForbiddenError } = require('../utils/errors/api-errors');
const { createInfoData } = require('../utils/create-info-data');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { LotsRepository } = require('../repositories/lots');
const { checkId } = require('../utils/check-id');
const { CardsService } = require('./cards');
const { generateEndDate } = require('../utils/generate-end-date');
const { UserService } = require('./users');
const { CharactersRepository } = require('../repositories/characters');
const { TransactionService } = require('./transactions');
const { ratingSubject } = require('./rating-subject');

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

  const lot = await LotsRepository.getLot('id', id);

  if (!lot) {
    throw new BadRequestError(['Lot not found']);
  }

  return lot;
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
    end_date: endDate ? new Date(endDate) : generateEndDate(),
    min_action_duration: minActionDuration || defaultMinActionDuration,
    min_step: minStep || defaultMinStep,
    max_price: maxPrice || defaultMaxPrice,
  };

  return LotsRepository.createLot(payload);
};

const finishAuction = async (lot) => {
  const { card, lastPersonToBet } = lot;

  if (lastPersonToBet) {
    await CardsService.changeOwner(card.id, lastPersonToBet.id);
    await CharactersRepository.markCharacterAsUsed(lot.card.character.id);
    await TransactionService.createTransaction(lot);

    // we don't need wait actions because it's side effect?
    ratingSubject.next(lastPersonToBet.id);
    ratingSubject.next(card.owner?.id);
  }

  await LotsRepository.finishAuction(lot.id);
};

const handleBet = async (lotId, bet, tokenData) => {
  if (isNaN(Number(bet)) || !Number(bet)) {
    throw new BadRequestError(['Incorrect bet']);
  }
  const lot = await getLotById(lotId);
  const {
    end_date, card, current_price, max_price, min_step, min_action_duration,
  } = lot;

  if (new Date() > end_date) {
    await finishAuction(lot);
    throw new BadRequestError(['Current auction already finished']);
  }

  if (card.owner?.id === tokenData.id) {
    throw new BadRequestError(['You cannot bet for yours lot!']);
  }

  if (current_price >= bet || bet > max_price) {
    throw new BadRequestError(['Bet must be more than previous and less than max price']);
  }

  const currentStep = bet - current_price;

  if (currentStep < min_step) {
    throw new BadRequestError(['Bet step must be more than minimum']);
  }

  const timeToAuctionEnd = end_date - new Date();
  const newEndDate = timeToAuctionEnd < min_action_duration ? generateEndDate(min_action_duration) : end_date;

  const user = await UserService.getUserById(tokenData.id);

  return LotsRepository.updateLot(lotId, user, {
    current_price: bet,
    end_date: newEndDate,
  });
};

module.exports.LotsService = {
  getLots,
  getLotById,
  createLot,
  handleBet,
};
