const Location = require('../models/locations');

const getLocations = (skip, limit) => {
  return Location.query()
    .withGraphFetched('residents')
    .limit(limit)
    .offset(skip);
};

module.exports.LocationsRepository = {
  getLocations,
};