require('dotenv').config();

const {
  DEV_SERVER_PORT,
  DEV_DB_TYPE,
  DEV_DB_NAME,
  DEV_DB_USER,
  DEV_DB_PASSWORD,
  DEV_DB_HOST,
  DEV_DB_PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  STRIPE_SECRET_KEY,
  SMTP_USER,
  SMTP_PASSWORD,
} = process.env;

const env = process.env.NODE_ENV;

const serverPort = parseInt(DEV_SERVER_PORT) || 8080;
const development = {
  server: {
    port: serverPort,
    apiUrl: `http://localhost:${serverPort}`,
    clientUrl: `http://localhost:3000`,
    apiEntrypoint: '/v1',
    activateEndpoint: '/activate',
    protocol: 'http',
    adminRole: 'admin',
    saltRounds: 7,
    maxPerRequest: 100,
    defaultPage: 1,
    defaultLimitPerPage: 20,
    defaultInitialPrice: 1,
    defaultMinActionDuration: 300000,
    defaultMinStep: 10,
    defaultMaxPrice: 2 ** 31 - 1,
    defaultAuctionDuration: 7 * 24 * 60 * 60 * 1000,
    defaultAdminUserName: 'admin',
    checkFinishedLotsInterval: '0 */1 * * * *',
    systemFee: 0.1,
    minNameLength: 4,
    socketEvents: {
      join: 'joinRoom',
      send: 'sendMessage',
      receive: 'receiveMessage',
      usersOnlineInfo: 'usersOnlineInfo',
    },
    jwtAccessSecret: JWT_ACCESS_SECRET || 'jwt_access_secret',
    jwtRefreshSecret: JWT_REFRESH_SECRET || 'jwt_refresh_secret',
    accessTokenExpiresIn: '10m',
    refreshTokenExpiresIn: '30d',
    stripeSecretKey: STRIPE_SECRET_KEY,
    stripeCurrency: 'usd',
    cardPointsRate: 1,
    smtpUser: SMTP_USER,
    smtpPassword: SMTP_PASSWORD,
    corsWhiteList: ['http://localhost:3000', 'http://172.17.0.1:3000'],
  },
  db: {
    type: DEV_DB_TYPE || 'mysql',
    host: DEV_DB_HOST || 'localhost',
    port: parseInt(DEV_DB_PORT) || 3306,
    user: DEV_DB_USER || 'root',
    name: DEV_DB_NAME || 'db',
    password: DEV_DB_PASSWORD || 'root',
  },
};

const config = {
  development,
};

module.exports = config[env];
