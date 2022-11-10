const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./get-data');

const setDataFromResults = (results, data) => {
  results.forEach(location => {
    const {
      name, type, dimension
    } = location;

    data.push({
      name,
      type,
      dimension,
    });
  });
};

const getLocationsData = async () => {
  const locations = [];
  let currentURL = BASE_URL + ENDPOINTS.locations;

  while (currentURL) {
    try {
      const currentResponse = await getData(currentURL);

      setDataFromResults(currentResponse.data.results, locations);

      currentURL = currentResponse.data.info.next;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return locations;
};

module.exports = {
  getLocationsData,
};
