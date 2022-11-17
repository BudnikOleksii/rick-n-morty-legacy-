const { NotFoundError } = require('../utils/errors/api-errors');
const { TypesRepository } = require('../repositories/types');

const getTypes = async () => {
  const types = await TypesRepository.getTypes();

  if (!types.length) {
    throw new NotFoundError(['Types not found']);
  }

  return types;
}

module.exports.TypesService = {
  getTypes,
};
