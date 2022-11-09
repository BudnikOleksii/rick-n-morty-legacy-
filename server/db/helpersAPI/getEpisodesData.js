const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./getData');

const getEpisodesData = async () => {
  const episodes = [];
  let nextPage;

  const setDataFromResults = (results) => {
    results.forEach(episodeData => {
      const {
        name, air_date, episode
      } = episodeData;

      episodes.push({
        name,
        air_date: new Date(air_date),
        episode,
      });
    });
  };

  try {
    const response = await getData(BASE_URL + ENDPOINTS.episodes);

    setDataFromResults(response.data.results);

    nextPage = response.data.info.next;
  } catch (error) {
    console.log(error);

    return;
  }

  while (nextPage) {
    try {
      const currentResponse = await getData(nextPage);

      setDataFromResults(currentResponse.data.results);

      nextPage = currentResponse.data.info.next;
    } catch (error) {
      console.log(error);

      return;
    }
  }

  return episodes;
};

module.exports = {
  getEpisodesData,
};
