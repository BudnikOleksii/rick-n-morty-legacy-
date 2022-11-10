exports.seed = async function(knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      username: 'admin',
      login: 'admin@gmail.com',
      password: '12345678',
      ip: '44.33.111.22',
    },
    {
      username: 'user',
      login: 'user@gmail.com',
      password: '12345678',
      ip: '44.33.111.22',
    },
  ]);
};
