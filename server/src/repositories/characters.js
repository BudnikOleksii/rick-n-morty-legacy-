const Character = require('../models/characters');

const getCharacters = (page, limit) => {
  return Character.query()
    .withGraphFetched('[species, type, origin, location, episodes]')
    .page(page - 1, limit);
};

const getCharacterById = (id) => {
  return Character.query().findById(id);
}

module.exports.CharactersRepository = {
  getCharacters,
  getCharacterById,
};
