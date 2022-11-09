const DEFAULT_MIN_ACTION_DURATION = 300000;

exports.up = function(knex) {
  return knex.schema.createTable('lots', (table) => {
    table.increments('id');
    table
      .integer('card_id')
      .unsigned()
      .notNullable();
    table
      .integer('owner_id')
      .unsigned()
      .notNullable();
    table.integer('initial_price').notNullable();
    table.integer('current_price').notNullable();
    table.timestamp('start_date').defaultTo(knex.fn.now());
    table.timestamp('end_date').defaultTo(knex.fn.now());
    table.integer('min_action_duration').defaultTo(DEFAULT_MIN_ACTION_DURATION);
    table.integer('max_action_duration').defaultTo(DEFAULT_MIN_ACTION_DURATION);
    table.integer('min_step').notNullable();
    table.integer('max_price').notNullable();
    table
      .integer('last_person_to_bet_id')
      .unsigned()
      .notNullable();
    table.boolean('activated').defaultTo(true);

    table
      .foreign('card_id')
      .references('id')
      .inTable('cards')
      .onDelete('cascade');
    table
      .foreign('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .foreign('last_person_to_bet_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('lots');
};
