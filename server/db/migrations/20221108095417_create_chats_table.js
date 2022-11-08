exports.up = function(knex) {
  return knex.schema.createTable('chats', (table) => {
    table.increments('id');
    table.string('name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('chats');
};
