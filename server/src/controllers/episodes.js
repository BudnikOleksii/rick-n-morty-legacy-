const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { EpisodesService } = require('../services/episodes');

const { defaultPage, defaultLimitPerPage } = config.server;

const getEpisodes = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl;

  try {
    const episodesData = await EpisodesService.getEpisodes(page, limit, endpoint);

    return res.status(httpStatusCodes.OK).json(episodesData);
  } catch (error) {
    next(error);
  }
};

module.exports.EpisodesController = {
  getEpisodes,
};
