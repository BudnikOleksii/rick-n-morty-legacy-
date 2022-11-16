const { body } = require('express-validator');

const ipRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

const userValidations = [
  body('login').isEmail().withMessage('Must be valid email'),
  body('password')
    .isLength({ min: 5, max: 15 })
    .withMessage('Password must be at least 5 chars long and less than 15')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
  body('ip').matches(ipRegExp).withMessage('Must be valid ip'),
];

const newUserValidations = [
  body('username').isLength({ min: 4 }).withMessage('Username must be at least 5 characters'),
  ...userValidations,
];

module.exports = {
  userValidations,
  newUserValidations,
};
