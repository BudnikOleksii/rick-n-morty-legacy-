require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const { BadRequestError } = require('../utils/errors/api-errors');

const authMiddleware = (authorisedRoles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const authorisationHeader = req.headers.authorization;

      if (!authorisationHeader) {
        throw new BadRequestError('User not authorised');
      }

      const token = authorisationHeader.split(' ')[1];
      const { roles } = jwt.verify(token, JWT_ACCESS_SECRET);
      const hasRole = roles.some(role => authorisedRoles.includes(role.title));

      if (!hasRole) {
        throw new BadRequestError('User does not have access privileges');
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  authMiddleware,
};
