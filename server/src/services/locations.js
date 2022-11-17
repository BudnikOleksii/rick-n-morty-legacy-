const config = require('../../config');

const { NotFoundError, BadRequestError} = require('../utils/errors/api-errors');
const { LocationsRepository } = require('../repositories/locations');

const { maxPerRequest } = config.server;

const getLocations = async (skip, limit) => {
  if (limit > maxPerRequest) {
    throw new BadRequestError([`Cannot fetch more than ${maxPerRequest} locations per request`]);
  }

  const locations = await LocationsRepository.getLocations(skip, limit);

  if (!locations.length) {
    throw new NotFoundError(['Locations not found']);
  }

  return locations;
}

module.exports.LocationsService = {
  getLocations,
};
