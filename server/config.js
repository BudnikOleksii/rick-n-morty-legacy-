require('dotenv').config();

const {
  DEV_SERVER_PORT, DEV_DB_TYPE, DEV_DB_NAME, DEV_DB_USER, DEV_DB_PASSWORD, DEV_DB_HOST, DEV_DB_PORT,
} = process.env;

const env = process.env.NODE_ENV;

const development = {
  server: {
    port: parseInt(DEV_SERVER_PORT) || 8080,
  },
  db: {
    type: DEV_DB_TYPE || 'mysql',
    host: DEV_DB_HOST || 'localhost',
    port: parseInt(DEV_DB_PORT) || 3306,
    user: DEV_DB_USER || 'root',
    name: DEV_DB_NAME || 'db',
    password: DEV_DB_PASSWORD || 'root',
  }
};

const config = {
  development,
};

module.exports = config[env];