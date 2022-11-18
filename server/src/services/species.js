const { SpeciesRepository } = require('../repositories/species');

const getSpecies = () => SpeciesRepository.getSpecies();

module.exports.SpeciesService = {
  getSpecies,
};
