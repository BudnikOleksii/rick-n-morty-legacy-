require('dotenv').config();

const {
  DEV_SERVER_PORT, DEV_DB_TYPE, DEV_DB_NAME, DEV_DB_USER, DEV_DB_PASSWORD, DEV_DB_HOST, DEV_DB_PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,
} = process.env;

const env = process.env.NODE_ENV;

const development = {
  server: {
    port: parseInt(DEV_SERVER_PORT) || 8080,
    protocol: 'http',
    adminRole: 'admin',
    saltRounds: 7,
    maxPerRequest: 100,
    defaultPage: 1,
    defaultLimitPerPage: 20,
    defaultInitialPrice: 1,
    defaultMinActionDuration: 300000,
    defaultMinStep: 10,
    defaultMaxPrice: 2**31 - 1,
    defaultAuctionDuration: 7 * 24 * 60 * 60 * 1000,
    defaultAdminUserName: 'admin',
    checkFinishedLotsInterval: '0 */1 * * * *',
    systemFee: 0.1,
    minNameLength: 4,
    jwtAccessSecret: JWT_ACCESS_SECRET || 'jwt_access_secret',
    jwtRefreshSecret: JWT_REFRESH_SECRET || 'jwt_refresh_secret',
    accessTokenExpiresIn: '3h',
    refreshTokenExpiresIn: '30d',
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
