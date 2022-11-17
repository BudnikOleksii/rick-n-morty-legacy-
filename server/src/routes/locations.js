const express = require('express');
const { LocationsController } = require('../controllers/locations');

const locationsRouter = express.Router();

locationsRouter.get('/', LocationsController.getLocations);

module.exports = locationsRouter;
