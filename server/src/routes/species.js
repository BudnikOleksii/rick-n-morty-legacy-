const express = require('express');
const { SpeciesController } = require('../controllers/species');
const { authGuard } = require('../middlewares/auth-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const speciesRouter = express.Router();

speciesRouter.use(authGuard);
speciesRouter.use(updateLastVisitDate);
speciesRouter.get('/', SpeciesController.getSpecies);

module.exports = speciesRouter;
