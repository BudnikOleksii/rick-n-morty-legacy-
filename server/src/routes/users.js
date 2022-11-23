const express = require('express');
const config = require('../../config');
const { UserController } = require('../controllers/users');
const { authenticationGuard } = require('../middlewares/authenticationGuard');
const { roleGuard } = require('../middlewares/roleGuard');

const { adminRole } = config.server;

const usersRouter = express.Router();

usersRouter.use(authenticationGuard);
usersRouter.get('/', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUserById);
usersRouter.get('/:id/cards', UserController.getUserCards);
usersRouter.delete('/:id', UserController.deleteUser);
usersRouter.patch('/role/:id', roleGuard(adminRole), UserController.addNewRole);

module.exports = usersRouter;
