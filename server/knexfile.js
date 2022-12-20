const config = require('./config');

const { type, name, user, password, host, port } = config.db;

module.exports = {
  development: {
    client: type,
    connection: {
      database: name,
      user: user,
      password: password,
      host: host,
      port: port,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
