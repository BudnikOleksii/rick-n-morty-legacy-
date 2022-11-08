exports.up = function(knex) {
  return knex.schema.createTable('characters', (table) => {
    table.increments('id');
    table.string('name').notNullable().unique();
    table.enu('status', ['Alive', 'Dead', 'unknown']).notNullable();
    table
      .integer('species_id')
      .unsigned()
      .notNullable();
    table
      .integer('type_id')
      .unsigned()
      .notNullable();
    table.enu('gender', ['Female', 'Male', 'Genderless', 'unknown']).notNullable();
    table
      .integer('origin_id')
      .unsigned()
      .notNullable();
    table
      .integer('location_id')
      .unsigned()
      .notNullable();
    table.string('image').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable().defaultTo(null);
    table.boolean('unused').defaultTo(true);

    table
      .foreign('species_id')
      .references('id')
      .inTable('species')
      .onDelete('cascade');
    table
      .foreign('type_id')
      .references('id')
      .inTable('types')
      .onDelete('cascade');
    table
      .foreign('origin_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade');
    table
      .foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('characters');
};
