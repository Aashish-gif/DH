const { body, param } = require('express-validator');

const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+',
];

const STATUS_VALUES = ['New', 'Contacted', 'Closed'];

const createLeadValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('budgetRange')
    .trim()
    .notEmpty()
    .withMessage('Budget range is required')
    .isIn(BUDGET_RANGES)
    .withMessage(`Budget range must be one of: ${BUDGET_RANGES.join(', ')}`),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

const updateStatusValidation = [
  param('id').isMongoId().withMessage('Invalid lead ID'),
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(STATUS_VALUES)
    .withMessage(`Status must be one of: ${STATUS_VALUES.join(', ')}`),
];

module.exports = {
  BUDGET_RANGES,
  STATUS_VALUES,
  createLeadValidation,
  updateStatusValidation,
};
