const express = require('express');
const config = require('../../config');
const { UserController } = require('../controllers/users');
const { authMiddleware } = require('../middlewares/auth');

const authorisedRoles = config.server.authorisedRoles;

const usersRouter = express.Router();

usersRouter.use(authMiddleware(authorisedRoles));
usersRouter.get('/', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUserById);
usersRouter.get('/:id/cards', UserController.getUserCards);
usersRouter.delete('/:id', UserController.deleteUser);
usersRouter.patch('/role/:id', UserController.addNewRole);

module.exports = usersRouter;
