const httpStatusCodes = require('../utils/httpStatusCodes');
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
