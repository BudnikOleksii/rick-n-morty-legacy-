const express = require('express');
const { TypesController } = require('../controllers/types');
const { authGuard } = require('../middlewares/authGuard');

const typesRouter = express.Router();

typesRouter.get('/', authGuard, TypesController.getTypes);

module.exports = typesRouter;
