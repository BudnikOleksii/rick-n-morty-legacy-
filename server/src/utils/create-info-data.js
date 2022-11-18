const config = require('../../config');

const { apiURL } = config.server;

const createInfoData = (total, page, limit, endpointName) => {
  const pages = Math.ceil(total / limit);

  return {
    total,
    next: page >= pages ? null : `${apiURL}/${endpointName}?page=${Number(page) + 1}&limit=${limit}`,
    prev: page <= 1 ? null : `${apiURL}/${endpointName}?page=${Number(page) - 1}&limit=${limit}`,
    pages,
  };
};

module.exports = {
  createInfoData,
};
