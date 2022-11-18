const bcrypt = require('bcrypt');
const config = require('../../config');

const { saltRounds } = config.server;

exports.seed = async function(knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      username: 'admin',
      login: 'admin@gmail.com',
      password: await bcrypt.hash('12345678', saltRounds),
      ip: '44.33.111.22',
    },
    {
      username: 'user',
      login: 'user@gmail.com',
      password: await bcrypt.hash('12345678', saltRounds),
      ip: '44.33.111.22',
    },
  ]);
};
