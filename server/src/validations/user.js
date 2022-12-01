const { body } = require('express-validator');

const userValidations = [
  body('login').isEmail().withMessage('Must be valid email'),
  body('password')
    .isLength({ min: 5, max: 15 })
    .withMessage('Password must be at least 5 chars long and less than 15')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
];

const newUserValidations = [
  body('username').isLength({ min: 4 }).withMessage('Username must be at least 5 characters'),
  ...userValidations,
];

module.exports = {
  userValidations,
  newUserValidations,
};
