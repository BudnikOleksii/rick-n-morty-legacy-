const { body } = require('express-validator');
const { defaultMaxPrice } = require('../../config').server;

const newLotValidations = [
  body('cardId').isInt({ min: 1 }).withMessage('Invalid ID'),
  body('initialPrice')
    .isInt({ min: 1 })
    .withMessage('Initial price must be positive number')
    .optional(),
  body('endDate')
    .isAfter()
    .withMessage('End date must be in future')
    .optional(),
  body('minActionDuration')
    .isInt({ min: 1 })
    .withMessage('Min action duration must be positive number')
    .optional(),
  body('minStep')
    .isInt({ min: 1 })
    .withMessage('Min step duration must be positive number')
    .optional(),
  body('maxPrice')
    .isInt({ min: 1, max: defaultMaxPrice })
    .withMessage(`Max price must be between 1 and ${defaultMaxPrice}`)
    .optional(),
];

module.exports = {
  newLotValidations,
};
