const config = require('../../config');

const { NotFoundError, BadRequestError} = require('../utils/errors/api-errors');
const { LocationsRepository } = require('../repositories/locations');
const {createInfoData} = require('../utils/create-info-data');

const { maxPerRequest } = config.server;

const getLocations = async (page, limit) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} locations per request`]);
  }

  const { results, total } = await LocationsRepository.getLocations(page, limit);

  if (!results.length) {
    throw new NotFoundError(['Locations not found']);
  }

  return {
    info: createInfoData(total, page, limit, 'locations'),
    results,
  };
}

module.exports.LocationsService = {
  getLocations,
};
