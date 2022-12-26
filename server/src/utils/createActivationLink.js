const { apiUrl, apiEntrypoint, activateEndpoint } = require('../../config').server;
const createActivationLink = (link) => {
  return `${apiUrl}${apiEntrypoint}/auth${activateEndpoint}/${link}`;
};

module.exports = {
  createActivationLink,
};
