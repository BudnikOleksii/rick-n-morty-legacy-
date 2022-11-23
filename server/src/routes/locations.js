const express = require('express');
const { LocationsController } = require('../controllers/locations');
const { authenticationGuard } = require('../middlewares/authenticationGuard');

const locationsRouter = express.Router();

locationsRouter.use(authenticationGuard);
locationsRouter.get('/', LocationsController.getLocations);

module.exports = locationsRouter;
