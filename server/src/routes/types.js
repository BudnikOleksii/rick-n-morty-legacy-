const express = require('express');
const { TypesController } = require('../controllers/types');
const { authenticationGuard } = require('../middlewares/authGuard');

const typesRouter = express.Router();

typesRouter.use(authenticationGuard);
typesRouter.get('/', TypesController.getTypes);

module.exports = typesRouter;
