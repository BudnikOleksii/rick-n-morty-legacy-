const express = require('express');
const { EpisodesController } = require('../controllers/episodes');
const { authenticationGuard } = require('../middlewares/authenticationGuard');

const episodesRouter = express.Router();

episodesRouter.use(authenticationGuard);
episodesRouter.get('/', EpisodesController.getEpisodes);

module.exports = episodesRouter;
