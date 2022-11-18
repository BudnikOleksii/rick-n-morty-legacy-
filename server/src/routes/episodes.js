const express = require('express');
const { EpisodesController } = require('../controllers/episodes');

const episodesRouter = express.Router();

episodesRouter.get('/', EpisodesController.getEpisodes);

module.exports = episodesRouter;
