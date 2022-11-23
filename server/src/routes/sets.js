const express = require('express');
const config = require('../../config');
const { SetsController } = require('../controllers/sets');
const { authenticationGuard } = require('../middlewares/authenticationGuard');
const {roleGuard} = require('../middlewares/roleGuard');

const { adminRole } = config.server;

const setsRouter = express.Router();

setsRouter.use(authenticationGuard);
setsRouter.get('/', SetsController.getSets);
setsRouter.post('/', roleGuard(adminRole), SetsController.createSet);
setsRouter.patch('/:id', roleGuard(adminRole), SetsController.toggleCharactersInSet);
setsRouter.delete('/:id', roleGuard(adminRole), SetsController.deleteSet);

module.exports = setsRouter;
