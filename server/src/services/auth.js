const bcrypt = require('bcrypt');
const { UserRepository } = require('../repositories/users');
const { BadRequestError, InternalServerError} = require('../utils/errors/ApiErrors');

const saltRounds = 7;

const registerUser = async (body) => {
  const {
    username, login, password, ip
  } = body;

  let candidate = await UserRepository.getUser('login', login);

  if (candidate) {
    throw new BadRequestError(['Current email already in use']);
  }

  candidate = await UserRepository.getUser('username', username);

  if (candidate) {
    throw new BadRequestError(['Current user already exists']);
  }

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  const user = await UserRepository.createUser({
    username,
    login,
    password: hashPassword,
    ip,
  });

  if (!user) {
    throw new InternalServerError('Cannot create user');
  }

  return user;
}

module.exports.AuthService = {
  registerUser,
};
