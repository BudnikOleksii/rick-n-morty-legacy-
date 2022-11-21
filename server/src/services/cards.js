const { NotFoundError } = require('../utils/errors/api-errors');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { CardsRepository } = require('../repositories/cards');
const { verifyPermission } = require('../utils/verify-permission');
const { CharactersService } = require('./characters');

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

const getCurrentUserCards = async (tokenData) => {
  console.log(tokenData);
  return {msg: 'OK'}
};

const createCard = async (characterId, tokenData) => {
  verifyPermission(tokenData);
  // verification is all cards sold at least once

  const character = await CharactersService.getCharacterById(characterId);

  return CardsRepository.createCard(character);
};

module.exports.CardsService = {
  getCards,
  getCardById,
  getCurrentUserCards,
  createCard,
};
