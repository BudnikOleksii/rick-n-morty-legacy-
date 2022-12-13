const Location = require('../models/locations');

const getLocations = () => {
  return Location.query();
};

module.exports.LocationsRepository = {
  getLocations,
};
