const express = require('express');
const { LocationsController } = require('../controllers/locations');
const { authGuard } = require('../middlewares/auth-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const locationsRouter = express.Router();

locationsRouter.use(authGuard);
locationsRouter.use(updateLastVisitDate);
locationsRouter.get('/', LocationsController.getLocations);

module.exports = locationsRouter;
