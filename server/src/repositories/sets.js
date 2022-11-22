const Set = require('../models/sets');

const getSets = (page, limit) => {
  return Set.query()
    .withGraphFetched('characters.[species, type, origin, location, episodes]')
    .page(page - 1, limit);
};

const getSet = (columnName, value) => {
  return Set.query()
    .withGraphFetched('characters.[species, type, origin, location, episodes]')
    .findOne(columnName, value);
};

const createSet = (name) => {
  return Set.query().insertAndFetch({ name });
};

const deleteSet = (id) => Set.query().deleteById(id);

const addCharacterToSet = async (set, character) => {
  await set
    .$relatedQuery('characters')
    .relate(character);

  return getSet('id', set.id);
};

const removeCharacterFromSet = async (set, character) => {
  await set
    .$relatedQuery('characters')
    .unrelate()
    .where('id', character.id);

  return getSet('id', set.id);
};

module.exports.SetsRepository = {
  getSets,
  getSet,
  createSet,
  deleteSet,
  addCharacterToSet,
  removeCharacterFromSet,
};