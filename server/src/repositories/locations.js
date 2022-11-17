const Location = require('../models/locations');

const getLocations = (skip, limit) => {
  return Location.query()
    .select()
    .limit(limit)
    .offset(skip);
};

module.exports.LocationsRepository = {
  getLocations,
};