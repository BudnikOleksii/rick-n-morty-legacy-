const express = require('express');
const { UserController } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', UserController.httpGetAllUsers);
usersRouter.get('/:id', UserController.httpGetUserById);

module.exports = usersRouter;
