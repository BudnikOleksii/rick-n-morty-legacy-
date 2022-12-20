const config = require('../../config');

const { protocol } = config.server;

const createInfoData = (total, page, limit, endpoint) => {
  const pages = Math.ceil(total / limit);

  return {
    total,
    next:
      page >= pages ? null : `${protocol}://${endpoint}?page=${Number(page) + 1}&limit=${limit}`,
    prev: page <= 1 ? null : `${protocol}://${endpoint}?page=${Number(page) - 1}&limit=${limit}`,
    pages,
  };
};

module.exports = {
  createInfoData,
};
