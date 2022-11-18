const Type = require('../models/types');

const getTypes = () => Type.query();

module.exports.TypesRepository = {
  getTypes,
};
