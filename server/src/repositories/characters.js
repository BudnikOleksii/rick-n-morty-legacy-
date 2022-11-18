const Character = require('../models/characters');

const getCharacters = (skip, limit) => {
  return Character.query()
    .withGraphFetched('[species, type, origin, location, episodes]')
    .limit(limit)
    .offset(skip);
};

module.exports.CharactersRepository = {
  getCharacters,
};
