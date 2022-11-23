const express = require('express');
const { SpeciesController } = require('../controllers/species');
const { authGuard } = require('../middlewares/authGuard');

const speciesRouter = express.Router();

speciesRouter.get('/', authGuard, SpeciesController.getSpecies);

module.exports = speciesRouter;
