exports.up = function(knex) {
  return knex.schema.createTable('users_roles', (table) => {
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .integer('role_id')
      .unsigned()
      .notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .foreign('role_id')
      .references('id')
      .inTable('roles')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_roles');
};
