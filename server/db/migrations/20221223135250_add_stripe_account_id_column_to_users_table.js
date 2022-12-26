/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.string('stripe_account_id', 128);
    table.string('activation_link', 128);
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('stripe_account_id');
    table.dropColumn('activation_link');
  });
};
