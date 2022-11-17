const httpStatusCodes = require('../utils/http-status-codes');
const { getPagination } = require('../utils/get-pagination');
const { CharactersService } = require('../services/characters');

const getCharacters = async (req, res, next) => {
  const { skip, limit } = getPagination(req.query);

  try {
    const charactersData = await CharactersService.getCharacters(skip, limit);

    return res.status(httpStatusCodes.OK).json(charactersData);
  } catch (error) {
    next(error);
  }
};

module.exports.CharactersController = {
  getCharacters,
};
