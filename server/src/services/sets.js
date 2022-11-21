const config = require('../../config');

const { BadRequestError, NotFoundError} = require('../utils/errors/api-errors');
const { SetsRepository } = require('../repositories/sets');
const { createInfoData } = require('../utils/create-info-data');
const { verifyPermission } = require('../utils/verify-permission');
const { checkId } = require('../utils/check-id');
const { CharactersService } = require('./characters');

const { maxPerRequest, minNameLength } = config.server;

const getSets = async (page, limit, endpoint) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} sets per request`]);
  }

  const { results, total } = await SetsRepository.getSets(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getSet = async (columnName, value) => {
  const set = await SetsRepository.getSet(columnName, value);

  if (!set) {
    throw new BadRequestError(['Set not found']);
  }

  return set;
};

const createSet = async (name, tokenData) => {
  verifyPermission(tokenData);

  if (name.trim().length < minNameLength) {
    throw new BadRequestError([`Set name should be at least ${minNameLength} characters`]);
  }

  const candidate = await SetsRepository.getSet('name', name);

  if (candidate) {
    throw new BadRequestError(['Current set already exists']);
  }

  return SetsRepository.createSet(name);
};

const deleteSet = async (id, tokenData) => {
  verifyPermission(tokenData);
  checkId(id);

  const deletedSet = await SetsRepository.deleteSet(id);

  if (!deletedSet) {
    throw new NotFoundError(['Set not found']);
  }

  return deletedSet;
};

const toggleCharactersInSet = async (setId, characterId, tokenData) => {
  verifyPermission(tokenData);

  const set = await getSet('id', setId);
  const character = await CharactersService.getCharacterById(characterId);
  const isSetHaveExistingCharacter = set.characters.some(character => character.id === Number(characterId));

  if (isSetHaveExistingCharacter) {
    return SetsRepository.removeCharacterFromSet(set, character);
  }

  return SetsRepository.addCharacterToSet(set, character);
};

module.exports.SetsService = {
  getSets,
  getSet,
  createSet,
  deleteSet,
  toggleCharactersInSet,
};
