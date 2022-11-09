exports.up = function(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id');
    table
      .integer('lot_id')
      .unsigned()
      .notNullable();
    table
      .integer('seller_id')
      .unsigned()
      .notNullable();
    table
      .integer('purchaser_id')
      .unsigned()
      .notNullable();
    table.float('amount').notNullable();
    table.float('system_fee').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table
      .foreign('lot_id')
      .references('id')
      .inTable('lots')
      .onDelete('cascade');
    table
      .foreign('seller_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .foreign('purchaser_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
