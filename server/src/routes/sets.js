const express = require('express');
const config = require('../../config');
const { SetsController } = require('../controllers/sets');
const { authMiddleware } = require('../middlewares/auth');

const { authorisedRoles } = config.server;

const setsRouter = express.Router();

setsRouter.use(authMiddleware(authorisedRoles));

setsRouter.get('/', SetsController.getSets);
setsRouter.post('/', SetsController.createSet);
setsRouter.patch('/:id', SetsController.addCharactersToSet);
setsRouter.delete('/:id', SetsController.deleteSet);

module.exports = setsRouter;
