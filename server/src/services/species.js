const { NotFoundError } = require('../utils/errors/api-errors');
const { SpeciesRepository } = require('../repositories/species');

const getSpecies = async () => {
  const species = await SpeciesRepository.getSpecies();

  if (!species.length) {
    throw new NotFoundError(['Species not found']);
  }

  return species;
}

module.exports.SpeciesService = {
  getSpecies,
};
