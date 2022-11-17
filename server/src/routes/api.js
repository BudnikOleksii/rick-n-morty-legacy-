const express = require('express');

const usersRouter = require('./users');
const authRouter = require('./auth');
const speciesRouter = require('./species');
const typesRouter = require('./types');
const locationsRouter = require('./locations');
const charactersRouter = require('./characters');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/auth', authRouter);
api.use('/species', speciesRouter);
api.use('/types', typesRouter);
api.use('/locations', locationsRouter);
api.use('/characters', charactersRouter);

module.exports = api;
