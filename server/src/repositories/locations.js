const Location = require('../models/locations');

const getLocations = (page, limit) => {
  return Location.query()
    // .withGraphFetched('residents')
    .page(page - 1, limit);
};

module.exports.LocationsRepository = {
  getLocations,
};