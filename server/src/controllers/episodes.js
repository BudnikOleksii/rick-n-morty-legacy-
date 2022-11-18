const httpStatusCodes = require('../utils/http-status-codes');
const { getPagination } = require('../utils/get-pagination');
const { EpisodesService } = require('../services/episodes');

const getEpisodes = async (req, res, next) => {
  const { skip, limit } = getPagination(req.query);

  try {
    const episodesData = await EpisodesService.getEpisodes(skip, limit);

    return res.status(httpStatusCodes.OK).json(episodesData);
  } catch (error) {
    next(error);
  }
};

module.exports.EpisodesController = {
  getEpisodes,
};
