const express = require('express');
const { httpGetUserById, httpGetAllUsers } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUserById);

module.exports = usersRouter;
