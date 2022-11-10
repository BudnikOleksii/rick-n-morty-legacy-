const { BASE_URL, ENDPOINTS } = require('./constants');
const { getData } = require('./get-data');

const setDataFromResults = (results, speciesSet, typesSet, characters) => {
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

const getCharactersData = async () => {
  const speciesSet = new Set();
  const typesSet = new Set();
  const characters = [];
  const species = [];
  const types = [];
  let currentURL = BASE_URL + ENDPOINTS.characters;

  while (currentURL) {
    try {
      const response = await getData(currentURL);

      currentURL = response.data.info.next;

      setDataFromResults(response.data.results, speciesSet, typesSet, characters);
    } catch (error) {
      throw error;
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
