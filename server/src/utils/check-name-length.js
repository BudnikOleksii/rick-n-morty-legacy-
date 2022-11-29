const { minNameLength } = require('../../config').server;
const { BadRequestError } = require('./errors/api-errors');

const checkNameLength = (name) => {
  if (name.trim().length < minNameLength) {
    throw new BadRequestError([`Chat name should be at least ${minNameLength} characters`]);
  }
};

module.exports = {
  checkNameLength,
};
