const { LocationsRepository } = require('../repositories/locations');
const { createInfoData } = require('../utils/create-info-data');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');

const getLocations = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'locations');
  const { results, total } = await LocationsRepository.getLocations(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

module.exports.LocationsService = {
  getLocations,
};
