const express = require('express');
const { EpisodesController } = require('../controllers/episodes');
const { authGuard } = require('../middlewares/authGuard');

const episodesRouter = express.Router();

episodesRouter.get('/', authGuard, EpisodesController.getEpisodes);

module.exports = episodesRouter;
