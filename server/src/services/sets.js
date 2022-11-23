const config = require('../../config');

const { BadRequestError, NotFoundError} = require('../utils/errors/api-errors');
const { SetsRepository } = require('../repositories/sets');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');
const { CharactersService } = require('./characters');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');

const { minNameLength } = config.server;

const getSets = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'sets');
  const { results, total } = await SetsRepository.getSets(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getSet = async (columnName, value) => {
  const set = await SetsRepository.getSet(columnName, value);

  if (!set) {
    throw new NotFoundError(['Set not found']);
  }

  return set;
};

const createSet = async (name) => {
  if (name.trim().length < minNameLength) {
    throw new BadRequestError([`Set name should be at least ${minNameLength} characters`]);
  }

  const candidate = await SetsRepository.getSet('name', name);

  if (candidate) {
    throw new BadRequestError(['Current set already exists']);
  }

  return SetsRepository.createSet(name);
};

const deleteSet = async (id) => {
  checkId(id);
  const deletedSet = await SetsRepository.deleteSet(id);

  if (!deletedSet) {
    throw new NotFoundError(['Set not found']);
  }

  return deletedSet;
};

const toggleCharactersInSet = async (setId, characterId) => {
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
