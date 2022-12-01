const express = require('express');
const { TypesController } = require('../controllers/types');
const { authGuard } = require('../middlewares/auth-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const typesRouter = express.Router();

typesRouter.use(authGuard);
typesRouter.use(updateLastVisitDate);
typesRouter.get('/', TypesController.getTypes);

module.exports = typesRouter;
