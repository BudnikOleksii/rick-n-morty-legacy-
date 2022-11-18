const config = require('../../config');

const { NotFoundError, BadRequestError} = require('../utils/errors/api-errors');
const { CharactersRepository } = require('../repositories/characters');
const { createInfoData } = require('../utils/create-info-data');

const { maxPerRequest } = config.server;

const getCharacters = async (page, limit) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} characters per request`]);
  }

  const { results, total } = await CharactersRepository.getCharacters(page, limit);

  if (!results.length) {
    throw new NotFoundError(['Characters not found']);
  }

  return {
    info: createInfoData(total, page, limit, 'characters'),
    results,
  };
}

module.exports.CharactersService = {
  getCharacters,
};
