const { BadRequestError } = require('./errors/api-errors');

const checkMessageLength = (body) => {
  if (!body.trim()) {
    throw new BadRequestError(['Empty message not allowed!'])
  }
};

module.exports = {
  checkMessageLength,
};
