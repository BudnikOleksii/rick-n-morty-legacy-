const { NotFoundError } = require('../utils/errors/api-errors');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { CardsRepository } = require('../repositories/cards');
const { verifyPermission } = require('../utils/verify-permission');
const { CharactersService } = require('./characters');
const {UserService} = require('./users');

const getCards = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'cards');
  const { results, total } = await CardsRepository.getCards(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getCardById = async (id) => {
  checkId(id);

  const card = await CardsRepository.getCardById(id);

  if (!card) {
    throw new NotFoundError(['Card not found']);
  }

  return card;
};

const getUserCards = async (page, limit, endpoint, userId) => {
  checkLimitForRequest(limit, 'cards');
  const { results, total } = await CardsRepository.getUserCards(page, limit, userId);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const createCard = async (characterId, tokenData) => {
  verifyPermission(tokenData);
  // verification is all cards sold at least once

  const character = await CharactersService.getCharacterById(characterId);

  return CardsRepository.createCard(character);
};

const changeOwner = async (cardId, ownerId) => {
  checkId(cardId);
  checkId(ownerId);
  const card = await getCardById(cardId);
  const newOwner = await UserService.getUserById(ownerId);

  return CardsRepository.changeOwner(card, newOwner);
};

module.exports.CardsService = {
  getCards,
  getCardById,
  getUserCards,
  createCard,
  changeOwner,
};
