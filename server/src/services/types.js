const { TypesRepository } = require('../repositories/types');

const getTypes = () => TypesRepository.getTypes();

module.exports.TypesService = {
  getTypes,
};
