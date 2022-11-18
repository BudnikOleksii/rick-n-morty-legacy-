const config = require('../../config');

const { NotFoundError, BadRequestError} = require('../utils/errors/api-errors');
const { EpisodesRepository } = require('../repositories/episodes');

const { maxPerRequest } = config.server;

const getEpisodes = async (skip, limit) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} episodes per request`]);
  }

  const episodes = await EpisodesRepository.getEpisodes(skip, limit);

  if (!episodes.length) {
    throw new NotFoundError(['Episodes not found']);
  }

  return episodes;
}

module.exports.EpisodesService = {
  getEpisodes,
};
