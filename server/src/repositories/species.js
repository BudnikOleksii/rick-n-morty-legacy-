const Species = require('../models/species');

const getSpecies = () => Species.query();

module.exports.SpeciesRepository = {
  getSpecies,
};
