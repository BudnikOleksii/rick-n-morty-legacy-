const express = require('express');
const { AuthController } = require('../controllers/auth');
const { newUserValidations, userValidations } = require('../validations/user');

const authRouter = express.Router();

authRouter.post('/registration', newUserValidations, AuthController.registration);
authRouter.post('/login', userValidations, AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.post('/refresh', AuthController.refreshToken);

module.exports = authRouter;
