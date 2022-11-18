const express = require('express');
const config = require('../../config');
const { SetsController } = require('../controllers/sets');
const { authMiddleware } = require('../middlewares/auth');

const { authorisedRoles } = config.server;

const setsRouter = express.Router();

setsRouter.get('/', SetsController.getSets);

setsRouter.use(authMiddleware(authorisedRoles));
setsRouter.post('/', SetsController.createSet);
setsRouter.patch('/:id', SetsController.addCharactersToSet);

module.exports = setsRouter;
