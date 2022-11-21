const config = require('../../config');

const { BadRequestError} = require('../utils/errors/api-errors');
const { CharactersRepository } = require('../repositories/characters');
const { createInfoData } = require('../utils/create-info-data');

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

module.exports.CharactersService = {
  getCharacters,
};
