exports.up = function(knex) {
  return knex.schema.createTable('cards', (table) => {
    table.increments('id');
    table
      .integer('character_id')
      .unsigned()
      .notNullable();
    table
      .integer('owner_id')
      .unsigned()
      .notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable().defaultTo(null);

    table
      .foreign('character_id')
      .references('id')
      .inTable('characters')
      .onDelete('cascade');
    table
      .foreign('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cards');
};
