exports.up = function(knex) {
  return knex.schema.createTable('sets_characters', (table) => {
    table
      .integer('set_id')
      .unsigned()
      .notNullable();
    table
      .integer('character_id')
      .unsigned()
      .notNullable();

    table
      .foreign('set_id')
      .references('id')
      .inTable('sets')
      .onDelete('cascade');
    table
      .foreign('character_id')
      .references('id')
      .inTable('characters')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sets_characters');
};
