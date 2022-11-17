const http = require('http');
const config = require('../config');

const app = require('./app');

const PORT = config.server.port;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
