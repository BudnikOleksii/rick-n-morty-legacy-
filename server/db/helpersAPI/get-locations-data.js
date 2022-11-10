const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./get-data');

const getLocation = (location) => {
  const {
    name, type, dimension
  } = location;

  return {
    name,
    type,
    dimension,
  };
};

const getLocationsData = async () => {
  const locations = [];
  let currentURL = BASE_URL + ENDPOINTS.locations;

  while (currentURL) {
    try {
      const { data } = await getData(currentURL);

      const currentLocations = data.results.map(getLocation);
      locations.push(...currentLocations);

      currentURL = data.info.next;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return locations;
};

module.exports = {
  getLocationsData,
};
