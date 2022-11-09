exports.up = function(knex) {
  return knex.schema.createTable('locations_characters', (table) => {
    table
      .integer('location_id')
      .unsigned()
      .notNullable();
    table
      .integer('character_id')
      .unsigned()
      .notNullable();

    table
      .foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade');
    table
      .foreign('character_id')
      .references('id')
      .inTable('characters')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations_characters');
};
