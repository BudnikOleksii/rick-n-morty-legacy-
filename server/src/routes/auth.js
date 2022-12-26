const express = require('express');
const { AuthController } = require('../controllers/auth');
const { newUserValidations, userValidations } = require('../validations/user');
const { activateEndpoint } = require('../../config').server;

const authRouter = express.Router();

authRouter.post('/registration', newUserValidations, AuthController.registration);
authRouter.post('/login', userValidations, AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.post('/refresh', AuthController.refreshToken);
authRouter.get(`${activateEndpoint}/:link`, AuthController.activateAccount);

module.exports = authRouter;
