const express = require('express');

const usersRouter = require('./users');
const authRouter = require('./auth');
const { errorHandler } = require('../middlewares/error-handler');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/auth', authRouter);
api.use(errorHandler);

module.exports = api;
