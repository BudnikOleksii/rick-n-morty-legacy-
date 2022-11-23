const config = require('../../config');
const httpStatusCodes = require('../utils/http-status-codes');
const { LotsService } = require('../services/lots');
const { validate } = require('../validations/validate');

const { defaultPage, defaultLimitPerPage } = config.server;

const getLots = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl;

  try {
    const lotsData = await LotsService.getLots(page, limit, endpoint);

    return res.status(httpStatusCodes.OK).json(lotsData);
  } catch (error) {
    next(error);
  }
};

const createLot = async (req, res, next) => {
  try {
    validate(req);

    const lotData = await LotsService.createLot(req.body, req.user);

    return res.status(httpStatusCodes.CREATED).json(lotData);
  } catch (error) {
    next(error);
  }
};

const handleBet = async (req, res, next) => {
  const { id } = req.params;
  const { bet } = req.body;

  try {
    const lotData = await LotsService.handleBet(id, bet, req.user);

    return res.status(httpStatusCodes.OK).json(lotData);
  } catch (error) {
    next(error);
  }
};

module.exports.LotsController = {
  getLots,
  createLot,
  handleBet,
};
