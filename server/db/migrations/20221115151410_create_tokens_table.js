exports.up = function(knex) {
  return knex.schema.createTable('tokens', (table) => {
    table.increments('id');
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.string('refresh_token').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tokens');
};
