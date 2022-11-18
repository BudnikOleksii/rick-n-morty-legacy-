const express = require('express');
const { SpeciesController } = require('../controllers/species');

const speciesRouter = express.Router();

speciesRouter.get('/', SpeciesController.getSpecies);

module.exports = speciesRouter;
