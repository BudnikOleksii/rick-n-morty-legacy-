const config = require('../../config');

const { NotFoundError, BadRequestError} = require('../utils/errors/api-errors');
const { CharactersRepository } = require('../repositories/characters');

const { maxPerRequest, apiURL } = config.server;

const getCharacters = async (page, limit) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} characters per request`]);
  }

  const { results, total } = await CharactersRepository.getCharacters(page, limit);

  if (!results.length) {
    throw new NotFoundError(['Characters not found']);
  }

  const pages = Math.ceil(total / limit);

  return {
    info: {
      total,
      next: page >= pages ? null : `${apiURL}/characters?page=${Number(page) + 1}&limit=${limit}`,
      prev: page <= 1 ? null : `${apiURL}/characters?page=${Number(page) - 1}&limit=${limit}`,
      pages,
    },
    results,
  };
}

module.exports.CharactersService = {
  getCharacters,
};
