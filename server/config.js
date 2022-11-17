require('dotenv').config();

const {
  CLIENT, DATABASE, MYSQL_USER, PASSWORD, HOST, MYSQL_PORT
} = process.env;

const env = process.env.NODE_ENV;

const development = {
  server: {
    port: parseInt(process.env.DEV_SERVER_PORT) || 8080,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    name: process.env.DEV_DB_NAME || 'db',
  }
};

const config = {
  development,
};

module.exports = config[env];