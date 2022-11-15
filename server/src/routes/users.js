const express = require('express');
const { UserController } = require('../controllers/users');
const { authMiddleware } = require('../middlewares/auth');

const usersRouter = express.Router();

usersRouter.use(authMiddleware);
usersRouter.get('/', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUserById);

module.exports = usersRouter;
