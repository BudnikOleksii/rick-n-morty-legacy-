const express = require('express');
const { UserController } = require('../controllers/users');
const { authMiddleware } = require('../middlewares/auth');

const authorisedRoles = ['admin', 'user'];

const usersRouter = express.Router();

usersRouter.use(authMiddleware(authorisedRoles));
usersRouter.get('/', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUserById);

module.exports = usersRouter;
