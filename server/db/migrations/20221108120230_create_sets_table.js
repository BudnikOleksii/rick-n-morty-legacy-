exports.up = function(knex) {
  return knex.schema.createTable('sets', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable().defaultTo(null);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sets');
};
