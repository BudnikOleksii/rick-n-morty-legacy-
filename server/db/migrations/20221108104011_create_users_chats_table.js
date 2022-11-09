exports.up = function(knex) {
  return knex.schema.createTable('users_chats', (table) => {
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .integer('chat_id')
      .unsigned()
      .notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .foreign('chat_id')
      .references('id')
      .inTable('chats')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_chats');
};
