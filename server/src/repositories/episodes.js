const Episode = require('../models/episodes');

const getEpisodes = (page, limit) => {
  return Episode.query()
    .page(page - 1, limit);
};

module.exports.EpisodesRepository = {
  getEpisodes,
};