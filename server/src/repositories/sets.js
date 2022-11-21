const Set = require('../models/sets');
const { CharactersRepository } = require('./characters');

const getSets = (page, limit) => {
  return Set.query()
    .withGraphFetched('characters')
    .page(page - 1, limit);
};

const getSet = (columnName, value) => {
  return Set.query()
    .withGraphFetched('characters')
    .findOne(columnName, value);
};

const createSet = (name) => {
  return Set.query().insertAndFetch({ name });
};

const deleteSet = (id) => Set.query().deleteById(id);

const addCharactersToSet = async (set, characterId) => {
  const character = await CharactersRepository
    .getCharacterById(characterId)

  await set
    .$relatedQuery('characters')
    .relate(character);

  return getSet('id', set.id);
};

module.exports.SetsRepository = {
  getSets,
  getSet,
  createSet,
  deleteSet,
  addCharactersToSet,
};