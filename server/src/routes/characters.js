const express = require('express');
const { CharactersController } = require('../controllers/characters');
const { authenticationGuard } = require('../middlewares/authenticationGuard');

const charactersRouter = express.Router();

charactersRouter.use(authenticationGuard);
charactersRouter.get('/', CharactersController.getCharacters);
charactersRouter.get('/:id', CharactersController.getCharacterById);

module.exports = charactersRouter;
