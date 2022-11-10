const { getLocationsData } = require('../helpersAPI/get-locations-data');

exports.seed = async function(knex) {
  await knex('locations').del();

  const locations = await getLocationsData();

  await knex('locations').insert(locations);
};
