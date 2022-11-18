const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { LocationsService } = require('../services/locations');

const { defaultPage, defaultLimitPerPage } = config.server;

const getLocations = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;

  try {
    const locationsData = await LocationsService.getLocations(page, limit);

    return res.status(httpStatusCodes.OK).json(locationsData);
  } catch (error) {
    next(error);
  }
};

module.exports.LocationsController = {
  getLocations,
};
