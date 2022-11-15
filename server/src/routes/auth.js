const express = require('express');
const { AuthController } = require('../controllers/auth');
const { userValidations } = require('../validations/user');

const authRouter = express.Router();

authRouter.post('/registration', userValidations, AuthController.httpRegistration);
authRouter.post('/login', AuthController.httpLogin);
authRouter.get('/logout', AuthController.httpLogout);

module.exports = authRouter;
