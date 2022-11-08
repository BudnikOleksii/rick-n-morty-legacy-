exports.up = function(knex) {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id');
    table.string('title').notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
