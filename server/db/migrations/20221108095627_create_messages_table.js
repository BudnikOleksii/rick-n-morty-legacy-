exports.up = function(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id');
    table
      .integer('chat_id')
      .unsigned()
      .notNullable();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.text('body').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    table
      .foreign('chat_id')
      .references('id')
      .inTable('chats')
      .onDelete('cascade');
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
