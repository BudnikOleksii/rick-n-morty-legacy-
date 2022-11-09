const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./getData');

const getCharactersData = async () => {
  const speciesSet = new Set();
  const typesSet = new Set();
  const characters = [];
  const species = [];
  const types = [];
  let next;

  const getDataFromResults = (results) => {
    results.forEach((character) => {
      const {
        name, status, species, type, gender, origin, location, image,
      } = character;

      speciesSet.add(species);
      typesSet.add(type);

      characters.push({
        name,
        status,
        species,
        type,
        gender,
        origin: origin.name,
        location: location.name,
        image,
      })
    });
  };

  try {
    const response = await getData(BASE_URL + ENDPOINTS.characters);

    getDataFromResults(response.data.results);

    next = response.data.info.next;
  } catch (error) {
    console.log(error);

    return;
  }

  while (next) {
    try {
      const currentResponse = await getData(next);

      next = currentResponse.data.info.next;

      getDataFromResults(currentResponse.data.results);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  speciesSet.forEach((speciesName) => {
    species.push({ name: speciesName });
  });

  typesSet.forEach((typeName) => {
    types.push({ name: typeName });
  });

  return {
    characters,
    species,
    types,
  };
};

module.exports = {
  getCharactersData,
};
