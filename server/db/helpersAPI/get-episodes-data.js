const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./get-data');

const getEpisodesData = async () => {
  const episodes = [];
  const episodesNamesMap = new Map();
  let currentURL = BASE_URL + ENDPOINTS.episodes;

  while (currentURL) {
    try {
      const { data } = await getData(currentURL);

      data.results.forEach(episodeData => {
        const {
          id, name, air_date, episode
        } = episodeData;

        episodesNamesMap.set(id, name);

        episodes.push({
          name,
          air_date: new Date(air_date),
          episode,
        });
      });

      currentURL = data.info.next;
    } catch (error) {
      throw error;
    }
  }

  return {
    episodes,
    episodesNamesMap,
  };
};

module.exports = {
  getEpisodesData,
};
