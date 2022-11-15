const express = require('express');
const { UserController } = require('../controllers/users');
const { authMiddleware } = require('../middlewares/auth');

const usersRouter = express.Router();

usersRouter.use(authMiddleware);
usersRouter.get('/', UserController.httpGetAllUsers);
usersRouter.get('/:id', UserController.httpGetUserById);

module.exports = usersRouter;
