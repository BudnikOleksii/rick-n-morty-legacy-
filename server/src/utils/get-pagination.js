const config = require('../../config');

const { defaultPage, defaultLimitPerPage } = config.server;

function getPagination(query) {
  const page = Math.abs(query.page) || defaultPage;
  const limit = Math.abs(query.limit) || defaultLimitPerPage;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
