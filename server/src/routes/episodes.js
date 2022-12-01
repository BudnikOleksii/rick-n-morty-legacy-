const express = require('express');
const { EpisodesController } = require('../controllers/episodes');
const { authGuard } = require('../middlewares/auth-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const episodesRouter = express.Router();

episodesRouter.use(authGuard);
episodesRouter.use(updateLastVisitDate);
episodesRouter.get('/', EpisodesController.getEpisodes);

module.exports = episodesRouter;
