const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { CharactersService } = require('../services/characters');

const { defaultPage, defaultLimitPerPage } = config.server;

const getCharacters = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;

  try {
    const charactersData = await CharactersService.getCharacters(page, limit);

    return res.status(httpStatusCodes.OK).json(charactersData);
  } catch (error) {
    next(error);
  }
};

module.exports.CharactersController = {
  getCharacters,
};
