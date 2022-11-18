const config = require('../../config');

const { BadRequestError} = require('../utils/errors/api-errors');
const { EpisodesRepository } = require('../repositories/episodes');
const { createInfoData } = require('../utils/create-info-data');

const { maxPerRequest } = config.server;

const getEpisodes = async (page, limit, endpoint) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} episodes per request`]);
  }

  const { results, total } = await EpisodesRepository.getEpisodes(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
}

module.exports.EpisodesService = {
  getEpisodes,
};
