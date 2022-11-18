const config = require('../../config');

const { BadRequestError} = require('../utils/errors/api-errors');
const { SetsRepository } = require('../repositories/sets');
const { createInfoData } = require('../utils/create-info-data');
const {verifyPermission} = require('../utils/verify-permission');

const { maxPerRequest } = config.server;

const getSets = async (page, limit, endpoint) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} sets per request`]);
  }

  const { results, total } = await SetsRepository.getSets(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
}

const createSet = async (name, tokenData) => {
  verifyPermission(tokenData);

  if (name.trim().length < 4) {
    throw new BadRequestError(['Set name should be at least 4 characters']);
  }

  const candidate = await SetsRepository.getSet('name', name);

  if (candidate) {
    throw new BadRequestError(['Current set already exists']);
  }

  return SetsRepository.createSet(name);
};

const addCharactersToSet = async (setId, characterId, tokenData) => {
  verifyPermission(tokenData);

  const set = await SetsRepository.getSet('id', setId);
  const isSetHaveExistingCharacter = set.characters.some(character => character.id === Number(characterId));

  if (isSetHaveExistingCharacter) {
    throw new BadRequestError(['Set already includes this character']);
  }

  const setWithNewCharacters = await SetsRepository.addCharactersToSet(set, characterId)

  return {
    setWithNewCharacters,
  };
};

module.exports.SetsService = {
  getSets,
  createSet,
  addCharactersToSet,
};
