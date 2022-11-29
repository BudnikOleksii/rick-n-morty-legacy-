const express = require('express');
const config = require('../../config');
const { UserController } = require('../controllers/users');
const { authGuard } = require('../middlewares/authGuard');
const { roleGuard } = require('../middlewares/roleGuard');
const { selfOrRoleGuard } = require('../middlewares/selfOrRoleGuard');

const { adminRole } = config.server;

const usersRouter = express.Router();

usersRouter.use(authGuard);
usersRouter.get('/', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUserById);
usersRouter.get('/:id/cards', UserController.getUserCards);
usersRouter.get('/:id/sets', UserController.getUserSets);
usersRouter.get('/:id/balance', selfOrRoleGuard(adminRole), UserController.getUserBalance);
usersRouter.delete('/:id', selfOrRoleGuard(adminRole), UserController.deleteUser);
usersRouter.patch('/role/:id', roleGuard(adminRole), UserController.addNewRole);

module.exports = usersRouter;
