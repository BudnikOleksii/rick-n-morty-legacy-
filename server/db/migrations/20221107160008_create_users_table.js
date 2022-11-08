exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username').notNullable().unique();
    table.string('login').notNullable().unique();
    table.string('password').notNullable();
    table.integer('rating').notNullable();
    table.timestamp('registration_date').defaultTo(knex.fn.now());
    table.timestamp('last_visit_date').defaultTo(knex.fn.now());
    table.string('ip').notNullable();
    table.boolean('activated').defaultTo(true);
    table.timestamp('deleted_at').nullable().defaultTo(null);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
