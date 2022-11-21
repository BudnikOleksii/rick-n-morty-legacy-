const { EpisodesRepository } = require('../repositories/episodes');
const { createInfoData } = require('../utils/create-info-data');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');

const getEpisodes = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'episodes');
  const { results, total } = await EpisodesRepository.getEpisodes(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

module.exports.EpisodesService = {
  getEpisodes,
};
