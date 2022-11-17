const express = require('express');

const usersRouter = require('./users');
const authRouter = require('./auth');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/auth', authRouter);

module.exports = api;
