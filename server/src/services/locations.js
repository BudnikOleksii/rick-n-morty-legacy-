const { LocationsRepository } = require('../repositories/locations');

const getLocations = () => {
  return LocationsRepository.getLocations();
};

module.exports.LocationsService = {
  getLocations,
};
