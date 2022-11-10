exports.seed = async function(knex) {
  await knex('locations_characters').del();

  const rowData = await knex('locations')
    .select(knex.ref('locations.id').as('location_id'), knex.ref('characters.id').as('character_id'))
    .join('characters', 'characters.location_id', 'locations.id');

  const residentsData = rowData.map(({ location_id, character_id }) => ({
    location_id,
    character_id,
  }));

  await knex('locations_characters').insert(residentsData);
};
