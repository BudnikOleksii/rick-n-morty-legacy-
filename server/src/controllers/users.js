const { getUserById } = require('../services/users');

const httpGetUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  httpGetUserById,
};
