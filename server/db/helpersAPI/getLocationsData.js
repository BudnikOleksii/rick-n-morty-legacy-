const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./getData');

const getLocationsData = async () => {
  const locations = [];
  let nextPage;

  const setDataFromResults = (results) => {
    results.forEach(location => {
      const {
        name, type, dimension
      } = location;

      locations.push({
        name,
        type,
        dimension,
      });
    });
  };

  try {
    const response = await getData(BASE_URL + ENDPOINTS.locations);

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

  return locations;
};

module.exports = {
  getLocationsData,
};
