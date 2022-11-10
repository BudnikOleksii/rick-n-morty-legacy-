const { getCharactersData } = require('../helpersAPI/get-characters-data');

exports.seed = async function(knex) {
  await Promise.all(
    ['species', 'types', 'characters'].map(tableName => knex(tableName).del())
  );

  const { species, types, characters } = await getCharactersData();

  // Insert species and types data
  await knex('species').insert(species);
  await knex('types').insert(types);

  // get actual data from our database with ids
  const locationsData = await knex.select('id', 'name').from('locations');
  const speciesData = await knex.select().from('species');
  const typesData = await knex.select().from('types');

  // creates maps for our data
  const locationsMap = new Map();
  const speciesMap = new Map();
  const typesMap = new Map();

  locationsData.forEach(location => {
    locationsMap.set(location.name, location.id);
  });
  speciesData.forEach(species => {
    speciesMap.set(species.name, species.id);
  });
  typesData.forEach(types => {
    typesMap.set(types.name, types.id);
  });

  // create actual data for our characters table
  const charactersData = characters.map(character => ({
    name: character.name,
    status: character.status,
    species_id: speciesMap.get(character.species),
    type_id: typesMap.get(character.type),
    gender: character.gender,
    origin_id: locationsMap.get(character.origin) || null,
    location_id: locationsMap.get(character.location) || null,
    image: character.image,
  }));

  await knex('characters').insert(charactersData);
};
