const express = require('express');
const { AuthController } = require('../controllers/auth');
const { newUserValidations, userValidations} = require('../validations/user');

const authRouter = express.Router();

authRouter.post('/registration', newUserValidations, AuthController.httpRegistration);
authRouter.post('/login', userValidations, AuthController.httpLogin);
authRouter.get('/logout', AuthController.httpLogout);

module.exports = authRouter;
