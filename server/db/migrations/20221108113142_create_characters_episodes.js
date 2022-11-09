exports.up = function(knex) {
  return knex.schema.createTable('characters_episodes', (table) => {
    table
      .integer('episode_id')
      .unsigned()
      .notNullable();
    table
      .integer('character_id')
      .unsigned()
      .notNullable();

    table
      .foreign('episode_id')
      .references('id')
      .inTable('episodes')
      .onDelete('cascade');
    table
      .foreign('character_id')
      .references('id')
      .inTable('characters')
      .onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('characters_episodes');
};
