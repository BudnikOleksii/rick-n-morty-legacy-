const express = require('express');
const config = require('../../config');
const { authMiddleware } = require('../middlewares/auth');
const { LotsController } = require('../controllers/lots');

const { authorisedRoles } = config.server;

const lotsRouter = express.Router();

lotsRouter.use(authMiddleware(authorisedRoles));

lotsRouter.get('/', LotsController.getLots);
lotsRouter.post('/', LotsController.createLot);

module.exports = lotsRouter;
