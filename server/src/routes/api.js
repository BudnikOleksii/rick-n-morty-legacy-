const express = require('express');

const usersRouter = require('./users');
const { errorHandler } = require('../middlewares/error-handler');

const api = express.Router();

api.use('/users', usersRouter);
api.use(errorHandler);

module.exports = api;
