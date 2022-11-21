const { BadRequestError } = require('./errors/api-errors');

const checkId = (id) => {
  if (isNaN(Number(id)) || !Number(id)) {
    throw new BadRequestError(['Invalid ID']);
  }
};

module.exports = {
  checkId,
};
