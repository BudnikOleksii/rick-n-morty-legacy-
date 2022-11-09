exports.up = function(knex) {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.string('dimension').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable().defaultTo(null);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations');
};
