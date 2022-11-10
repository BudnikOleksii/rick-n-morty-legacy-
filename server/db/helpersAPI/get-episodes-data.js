const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./get-data');

const setDataFromResults = (results, data) => {
  results.forEach(episodeData => {
    const {
      name, air_date, episode
    } = episodeData;

    data.push({
      name,
      air_date: new Date(air_date),
      episode,
    });
  });
};

const getEpisodesData = async () => {
  const episodes = [];
  let currentURL = BASE_URL + ENDPOINTS.episodes;

  while (currentURL) {
    try {
      const currentResponse = await getData(currentURL);

      setDataFromResults(currentResponse.data.results, episodes);

      currentURL = currentResponse.data.info.next;
    } catch (error) {
      throw error;
    }
  }

  return episodes;
};

module.exports = {
  getEpisodesData,
};
