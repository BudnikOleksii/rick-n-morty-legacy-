const httpStatusCodes = require('../utils/http-status-codes');
const { getUserById } = require('../services/users');

const httpGetUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    return res.status(httpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  httpGetUserById,
};
