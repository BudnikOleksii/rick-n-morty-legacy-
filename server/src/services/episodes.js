const config = require('../../config');

const { NotFoundError, BadRequestError} = require('../utils/errors/api-errors');
const { EpisodesRepository } = require('../repositories/episodes');
const { createInfoData } = require('../utils/create-info-data');

const { maxPerRequest } = config.server;

const getEpisodes = async (page, limit) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} episodes per request`]);
  }

  const { results, total } = await EpisodesRepository.getEpisodes(page, limit);

  if (!results.length) {
    throw new NotFoundError(['Episodes not found']);
  }

  return {
    info: createInfoData(total, page, limit, 'episodes'),
    results,
  };
}

module.exports.EpisodesService = {
  getEpisodes,
};
