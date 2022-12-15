const httpStatusCodes = require('../utils/http-status-codes');
const { LocationsService } = require('../services/locations');

const getLocations = async (req, res, next) => {
  try {
    const locationsData = await LocationsService.getLocations();

    return res.status(httpStatusCodes.OK).json(locationsData);
  } catch (error) {
    next(error);
  }
};

module.exports.LocationsController = {
  getLocations,
};
