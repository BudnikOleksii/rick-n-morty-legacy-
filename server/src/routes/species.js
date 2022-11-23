const express = require('express');
const { SpeciesController } = require('../controllers/species');
const { authenticationGuard } = require('../middlewares/authGuard');

const speciesRouter = express.Router();

speciesRouter.use(authenticationGuard);
speciesRouter.get('/', SpeciesController.getSpecies);

module.exports = speciesRouter;
