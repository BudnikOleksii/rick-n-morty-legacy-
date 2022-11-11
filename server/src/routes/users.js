const express = require('express');
const { httpGetUserById } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/:id', httpGetUserById);

module.exports = usersRouter;
