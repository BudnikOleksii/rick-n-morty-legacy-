const express = require('express');
const { CharactersController } = require('../controllers/characters');
const { authGuard } = require('../middlewares/auth-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const charactersRouter = express.Router();

charactersRouter.use(authGuard);
charactersRouter.use(updateLastVisitDate);
charactersRouter.get('/', CharactersController.getCharacters);
charactersRouter.get('/:id', CharactersController.getCharacterById);

module.exports = charactersRouter;
