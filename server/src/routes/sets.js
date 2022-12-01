const express = require('express');
const config = require('../../config');
const { SetsController } = require('../controllers/sets');
const { authGuard } = require('../middlewares/auth-guard');
const { roleGuard } = require('../middlewares/role-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const { adminRole } = config.server;

const setsRouter = express.Router();

setsRouter.use(authGuard);
setsRouter.use(updateLastVisitDate);
setsRouter.get('/', SetsController.getSets);
setsRouter.post('/', roleGuard(adminRole), SetsController.createSet);
setsRouter.patch('/:id', roleGuard(adminRole), SetsController.toggleCharactersInSet);
setsRouter.delete('/:id', roleGuard(adminRole), SetsController.deleteSet);

module.exports = setsRouter;
