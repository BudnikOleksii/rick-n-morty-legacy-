const httpStatusCodes = require('../utils/http-status-codes');
const { LocationsService } = require('../services/locations');
const { getPagination } = require('../utils/get-pagination');

const getLocations = async (req, res, next) => {
  const { skip, limit } = getPagination(req.query);

  try {
    const locationsData = await LocationsService.getLocations(skip, limit);

    return res.status(httpStatusCodes.OK).json(locationsData);
  } catch (error) {
    next(error);
  }
};

module.exports.LocationsController = {
  getLocations,
};
