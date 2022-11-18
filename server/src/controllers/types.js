const httpStatusCodes = require('../utils/http-status-codes');
const { TypesService } = require('../services/types');

const getTypes = async (req, res, next) => {
  try {
    const typesData = await TypesService.getTypes();

    return res.status(httpStatusCodes.OK).json(typesData);
  } catch (error) {
    next(error);
  }
};

module.exports.TypesController = {
  getTypes,
};
