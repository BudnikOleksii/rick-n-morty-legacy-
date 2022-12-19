const express = require('express');
const config = require('../../config');
const { UserController } = require('../controllers/users');
const { authGuard } = require('../middlewares/auth-guard');
const { roleGuard } = require('../middlewares/role-guard');
const { selfOrRoleGuard } = require('../middlewares/self-or-role-guard');
const { updateLastVisitDate } = require('../middlewares/update-last-visit');

const { adminRole } = config.server;

const usersRouter = express.Router();

usersRouter.use(authGuard);
usersRouter.use(updateLastVisitDate);
usersRouter.get('/', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUserById);
usersRouter.get('/:id/cards', UserController.getUserCards);
usersRouter.get('/:id/sets', UserController.getUserSets);
usersRouter.get('/:id/balance', selfOrRoleGuard(adminRole), UserController.getUserBalance);
usersRouter.get('/:id/chats', selfOrRoleGuard(adminRole), UserController.getUserChats);
usersRouter.get(
  '/:id/transactions',
  selfOrRoleGuard(adminRole),
  UserController.getUserTransactions
);
usersRouter.delete('/:id', selfOrRoleGuard(adminRole), UserController.deleteUser);
usersRouter.patch('/role/:id', roleGuard(adminRole), UserController.addNewRole);

module.exports = usersRouter;
