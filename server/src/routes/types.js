const express = require('express');
const { TypesController } = require('../controllers/types');

const typesRouter = express.Router();

typesRouter.get('/', TypesController.getTypes);

module.exports = typesRouter;
