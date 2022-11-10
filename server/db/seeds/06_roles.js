exports.seed = async function(knex) {
  await knex('roles').del();

  await knex('roles').insert([
    { title: 'admin' },
    { title: 'user' },
  ]);
};
