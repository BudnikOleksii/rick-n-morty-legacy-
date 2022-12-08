const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { SetsService } = require('../services/sets');

const { defaultPage, defaultLimitPerPage } = config.server;

const getSets = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl;

  try {
    const setsData = await SetsService.getSets(page, limit, endpoint);

    return res.status(httpStatusCodes.OK).json(setsData);
  } catch (error) {
    next(error);
  }
};

const getSetsInfo = async (req, res, next) => {
  try {
    const setsData = await SetsService.getSetsInfo();

    return res.status(httpStatusCodes.OK).json(setsData);
  } catch (error) {
    next(error);
  }
};

const createSet = async (req, res, next) => {
  const { name } = req.body;

  try {
    const setData = await SetsService.createSet(name);

    return res.status(httpStatusCodes.CREATED).json(setData);
  } catch (error) {
    next(error);
  }
};

const deleteSet = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedSet = await SetsService.deleteSet(id);

    return res.status(httpStatusCodes.OK).json(deletedSet);
  } catch (error) {
    next(error);
  }
};

const toggleCharactersInSet = async (req, res, next) => {
  const { id } = req.params;
  const { characterId } = req.body;

  try {
    const setWithNewCharacters = await SetsService.toggleCharactersInSet(id, characterId);

    return res.status(httpStatusCodes.OK).json(setWithNewCharacters);
  } catch (error) {
    next(error);
  }
};

module.exports.SetsController = {
  getSets,
  getSetsInfo,
  createSet,
  deleteSet,
  toggleCharactersInSet,
};
