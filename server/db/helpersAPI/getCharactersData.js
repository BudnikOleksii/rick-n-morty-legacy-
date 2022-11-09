const { BASE_URL, ENDPOINTS } = require('./constants');
const { getIdFromUrl } = require('./getIdFromUrl');
const { getData } = require('./getData');

const getCharactersData = async () => {
  const speciesMap = new Map();
  const typesMap = new Map();
  let speciesIndex = 1;
  let typesIndex = 1;
  const characters = [];
  const species = [];
  const types = [];
  let next;

  const getDataFromResults = (results) => {
    results.forEach((character) => {
      const {
        name, status, species, type, gender, origin, location, image,
      } = character;

      if (!speciesMap.has(species)) {
        speciesMap.set(species, speciesIndex);
        speciesIndex++;
      }

      if (!typesMap.has(type)) {
        typesMap.set(type, typesIndex);
        typesIndex++;
      }

      characters.push({
        name,
        status,
        species_id: speciesMap.get(species),
        type_id: typesMap.get(type),
        gender,
        origin: getIdFromUrl(origin.url) || null,
        location: getIdFromUrl(location.url) || null,
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

  speciesMap.forEach((_, key) => {
    species.push({ name: key });
  });

  typesMap.forEach((_, key) => {
    types.push({ name: key });
  });

  // console.log(response.data.results);
  // console.log(next);
  // console.log(characters);
  // console.log(typesMap);
  // console.log(speciesMap);
  // console.log(species);
  // console.log(types);

  return {
    characters,
    species,
    types,
  };
};

module.exports = {
  getCharactersData,
};
