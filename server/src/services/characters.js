const config = require('../../config');

const { BadRequestError} = require('../utils/errors/api-errors');
const { CharactersRepository } = require('../repositories/characters');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');

const { maxPerRequest } = config.server;

const getCharacters = async (page, limit, endpoint) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} characters per request`]);
  }

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
    throw new BadRequestError(['Character not found']);
  }

  return character;
};

module.exports.CharactersService = {
  getCharacters,
  getCharacterById,
};
