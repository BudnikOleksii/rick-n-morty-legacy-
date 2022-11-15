const jwt = require('jsonwebtoken');

const { secretKey } = require('../../config');
const { BadRequestError } = require('../utils/errors/api-errors');

const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const authorisationHeader = req.headers.authorization;

    if (!authorisationHeader) {
      throw new BadRequestError('Users not authorised');
    }

    const token = authorisationHeader.split(' ')[1];

    const decodedData = jwt.verify(token, secretKey);

    req.user = decodedData;
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
