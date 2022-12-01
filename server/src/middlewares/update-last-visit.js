const { UserService } = require('../services/users');
const { getIpFromRequest } = require('../utils/get-ip-from-request');
const updateLastVisitDate = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  if (req.user) {
    try {
      const ip = getIpFromRequest(req);

      await UserService.updateLastSeen(req.user.id, ip);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  next();
};

module.exports = {
  updateLastVisitDate,
};
