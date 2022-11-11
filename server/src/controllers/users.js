const httpStatusCodes = require('../utils/httpStatusCodes');
const { getUserById } = require('../services/users');

const httpGetUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    return res.status(httpStatusCodes.OK).json(user);
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};

module.exports = {
  httpGetUserById,
};
