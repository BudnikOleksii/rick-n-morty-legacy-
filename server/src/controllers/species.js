const httpStatusCodes = require('../utils/http-status-codes');
const { SpeciesService } = require('../services/species');

const getSpecies = async (req, res, next) => {
  try {
    const speciesData = await SpeciesService.getSpecies();

    return res.status(httpStatusCodes.OK).json(speciesData);
  } catch (error) {
    next(error);
  }
};

module.exports.SpeciesController = {
  getSpecies,
};
