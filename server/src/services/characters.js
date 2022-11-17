const config = require('../../config');

const { NotFoundError, BadRequestError} = require('../utils/errors/api-errors');
const { CharactersRepository } = require('../repositories/characters');

const { maxPerRequest } = config.server;

const getCharacters = async (skip, limit) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} characters per request`]);
  }

  const characters = await CharactersRepository.getCharacters(skip, limit);

  if (!characters.length) {
    throw new NotFoundError(['Characters not found']);
  }

  return characters;
}

module.exports.CharactersService = {
  getCharacters,
};
