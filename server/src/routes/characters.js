const express = require('express');
const { CharactersController } = require('../controllers/characters');

const charactersRouter = express.Router();

charactersRouter.get('/', CharactersController.getCharacters);
charactersRouter.get('/:id', CharactersController.getCharacterById);

module.exports = charactersRouter;
