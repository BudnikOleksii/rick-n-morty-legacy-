const { NotFoundError } = require('../utils/errors/api-errors');
const { CharactersRepository } = require('../repositories/characters');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');

const getCharacters = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'characters');
  const { results, total } = await CharactersRepository.getCharacters(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getCharacterById = async (id) => {
  checkId(id);

  const character = await CharactersRepository.getCharacterById(id);

  if (!character) {
    throw new NotFoundError(['Character not found']);
  }

  return character;
};

module.exports.CharactersService = {
  getCharacters,
  getCharacterById,
};
