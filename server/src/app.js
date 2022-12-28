const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connection = require('./db');

const api = require('./routes/api');
const { apiEntrypoint, corsWhiteList } = require('../config').server;
const { errorHandler } = require('./middlewares/error-handler');

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
api.use(errorHandler);

app.use(apiEntrypoint, api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
