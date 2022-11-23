const express = require('express');
const { LocationsController } = require('../controllers/locations');
const { authGuard } = require('../middlewares/authGuard');

const locationsRouter = express.Router();

locationsRouter.get('/', authGuard, LocationsController.getLocations);

module.exports = locationsRouter;
