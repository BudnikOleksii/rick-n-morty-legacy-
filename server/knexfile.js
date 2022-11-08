require('dotenv').config();

const {
  CLIENT, DATABASE, MYSQL_USER, PASSWORD, HOST, MYSQL_PORT
} = process.env;

module.exports = {
  development: {
    client: CLIENT,
    connection: {
      database: DATABASE,
      user: MYSQL_USER,
      password: PASSWORD,
      host: HOST,
      port: MYSQL_PORT,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
