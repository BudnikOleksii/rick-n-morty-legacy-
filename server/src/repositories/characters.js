const Character = require('../models/characters');

const getCharacters = (page, limit) => {
  return Character.query()
    .withGraphFetched('[species, type]')
    .page(page - 1, limit);
};

const getCharacterById = (id) => {
  return Character.query()
    .withGraphFetched('[species, type, origin, location, episodes, sets]')
    .findById(id);
};

const countUnused = () => Character.query().where('unused', true).resultSize();

const markCharacterAsUsed = (id) => Character.query().patchAndFetchById(id, { unused: false });

module.exports.CharactersRepository = {
  getCharacters,
  getCharacterById,
  countUnused,
  markCharacterAsUsed,
};
