const express = require('express');
const { CharactersController } = require('../controllers/characters');
const { authGuard } = require('../middlewares/authGuard');

const charactersRouter = express.Router();

charactersRouter.get('/', authGuard, CharactersController.getCharacters);
charactersRouter.get('/:id', authGuard, CharactersController.getCharacterById);

module.exports = charactersRouter;
