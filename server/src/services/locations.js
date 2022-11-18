const config = require('../../config');

const { BadRequestError} = require('../utils/errors/api-errors');
const { LocationsRepository } = require('../repositories/locations');
const { createInfoData } = require('../utils/create-info-data');

const { maxPerRequest } = config.server;

const getLocations = async (page, limit, endpoint) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} locations per request`]);
  }

  const { results, total } = await LocationsRepository.getLocations(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
}

module.exports.LocationsService = {
  getLocations,
};
