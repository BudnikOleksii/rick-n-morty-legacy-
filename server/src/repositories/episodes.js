const Episode = require('../models/episodes');

const getEpisodes = (skip, limit) => {
  return Episode.query()
    // .withGraphFetched('characters')
    .limit(limit)
    .offset(skip);
};

module.exports.EpisodesRepository = {
  getEpisodes,
};