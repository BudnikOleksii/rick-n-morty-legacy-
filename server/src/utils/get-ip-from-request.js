const getIpFromRequest = (req) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || null;

  if (ip) {
    ip = ip.split(':');
    ip = ip[ip.length - 1];
  }

  return ip;
};

module.exports = {
  getIpFromRequest,
};
